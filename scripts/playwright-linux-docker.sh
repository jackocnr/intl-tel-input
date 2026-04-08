#!/usr/bin/env bash
set -euo pipefail

PLAYWRIGHT_VERSION_DEFAULT="1.58.0"
PLAYWRIGHT_VERSION="$PLAYWRIGHT_VERSION_DEFAULT"

# Try to keep the Docker image version in sync with the repo's Playwright version.
if command -v node >/dev/null 2>&1; then
  DETECTED_VERSION="$(node -e "
    try {
      const pkg = require('./package.json');
      const spec = (pkg.devDependencies && (pkg.devDependencies['@playwright/test'] || pkg.devDependencies.playwright)) || '';
      const v = String(spec).replace(/^[^0-9]*/, '');
      if (v) process.stdout.write(v);
    } catch (e) {
      // ignore
    }
  " 2>/dev/null || true)"

  if [[ -n "$DETECTED_VERSION" ]]; then
    PLAYWRIGHT_VERSION="$DETECTED_VERSION"
  fi
fi

IMAGE_DEFAULT="mcr.microsoft.com/playwright:v${PLAYWRIGHT_VERSION}-jammy"
IMAGE="${PLAYWRIGHT_DOCKER_IMAGE:-$IMAGE_DEFAULT}"

if ! command -v docker >/dev/null 2>&1; then
  echo "Docker is required to run Playwright in Linux." >&2
  echo "Install Docker Desktop, then re-run this command." >&2
  exit 1
fi

WORKDIR="/work"

HOST_UID=""
HOST_GID=""
if command -v id >/dev/null 2>&1; then
  HOST_UID="$(id -u)"
  HOST_GID="$(id -g)"
fi

DOCKER_ARGS=(
  --rm
  --shm-size=1g
  -e HOME=/tmp
  -e npm_config_cache=/tmp/.npm
  -e npm_config_prefix=/tmp/.npm-global
  -e npm_config_update_notifier=false
  -e npm_config_fund=false
  -e npm_config_audit=false
  -e HOST_UID
  -e HOST_GID
  -v "$(pwd):$WORKDIR"
  -w "$WORKDIR"
  # Keep node_modules inside the container (avoid host permission issues and platform-specific deps).
  -v "$WORKDIR/node_modules"
)

# Useful on Apple Silicon if the image/platform doesn't match.
if [[ -n "${PLAYWRIGHT_DOCKER_PLATFORM:-}" ]]; then
  DOCKER_ARGS+=( --platform "$PLAYWRIGHT_DOCKER_PLATFORM" )
fi

# Run the full workflow inside the container:
# - install deps
# - build
# - run Playwright tests (pass through any extra args)
exec docker run "${DOCKER_ARGS[@]}" "$IMAGE" bash -lc \
  '
    set -euo pipefail

    mkdir -p "$npm_config_cache" "$npm_config_prefix"

    npm ci

    # Closure Compiler requires Java.
    apt-get update
    apt-get install -y --no-install-recommends openjdk-17-jre-headless
    rm -rf /var/lib/apt/lists/*

    npm run build

    npm run test:e2e -- "$@"

    # If we ran as root, ensure generated files are owned by the host user.
    if [[ -n "${HOST_UID:-}" && -n "${HOST_GID:-}" ]]; then
      chown -R "${HOST_UID}:${HOST_GID}" \
        "$WORKDIR/build" \
        "$WORKDIR/tmp" \
        "$WORKDIR/playwright-report" \
        "$WORKDIR/test-results" \
        "$WORKDIR/tests-e2e" \
        2>/dev/null || true
    fi
  ' -- "$@"
