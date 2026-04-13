import https from "node:https";
import fs from "node:fs";
import path from "node:path";

function httpsGet(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { "User-Agent": "intl-tel-input-build" } }, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        } else {
          resolve(data);
        }
      });
    }).on("error", reject);
  });
}

function formatNumber(n) {
  if (n >= 1_000_000) {
    const val = n / 1_000_000;
    return `${val % 1 === 0 ? val.toFixed(0) : val.toFixed(1)}M`;
  }
  if (n >= 1_000) {
    const val = n / 1_000;
    return `${val % 1 === 0 ? val.toFixed(0) : val.toFixed(1)}k`;
  }
  return `${n}`;
}

function roundToDisplay(n) {
  if (n >= 1_000_000) {
    return Math.round(n / 100_000) * 100_000;
  }
  if (n >= 100_000) {
    return Math.round(n / 1_000) * 1_000;
  }
  if (n >= 1_000) {
    return Math.round(n / 100) * 100;
  }
  return n;
}

async function fetchStats() {
  const statsPath = path.join(import.meta.dirname, "..", "tmp", "stats.json");

  // Default/fallback values
  const defaults = { websites: "137k", downloads: "3.2M", stars: "8.2k" };

  const isProd = process.argv.includes("--env=prod");
  if (!isProd) {
    console.log("Dev build — using default stats");
    fs.mkdirSync(path.dirname(statsPath), { recursive: true });
    fs.writeFileSync(statsPath, JSON.stringify(defaults, null, 2));
    return;
  }

  let stats = { ...defaults };

  try {
    const ghData = JSON.parse(
      await httpsGet("https://api.github.com/repos/jackocnr/intl-tel-input"),
    );
    stats.stars = formatNumber(roundToDisplay(ghData.stargazers_count));
  } catch (e) {
    console.warn("Failed to fetch GitHub stars, using fallback:", e.message);
  }

  try {
    const npmData = JSON.parse(
      await httpsGet("https://api.npmjs.org/downloads/point/last-month/intl-tel-input"),
    );
    stats.downloads = formatNumber(roundToDisplay(npmData.downloads));
  } catch (e) {
    console.warn("Failed to fetch npm downloads, using fallback:", e.message);
  }

  try {
    const nerdyHtml = await httpsGet(
      "https://www.nerdydata.com/reports/international-telephone-input/719de9d2-d0e7-4988-b02f-9f9d52687076",
    );
    const match = nerdyHtml.match(/"answerCount"\s*:\s*(\d+)/);
    if (match) {
      stats.websites = formatNumber(roundToDisplay(Number(match[1])));
    }
  } catch (e) {
    console.warn("Failed to fetch NerdyData count, using fallback:", e.message);
  }

  fs.mkdirSync(path.dirname(statsPath), { recursive: true });
  fs.writeFileSync(statsPath, JSON.stringify(stats, null, 2));
  console.log("Stats fetched:", stats);
}

fetchStats();
