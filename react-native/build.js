/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const { build } = require("esbuild");
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const packageJson = require("../package.json");

//* Helper function to run shell commands
const runCommand = (command, options = {}) => {
  console.log(`Running: ${command}`);
  try {
    return execSync(command, { stdio: 'inherit', ...options });
  } catch (error) {
    console.error(`Command failed: ${command}`);
    throw error;
  }
};

//* Check if React Native is already installed
const isReactNativeInstalled = () => {
  try {
    require.resolve('react-native');
    return true;
  } catch {
    return false;
  }
};

//* Install React Native temporarily for TypeScript compilation
const installReactNativeTemp = () => {
  if (!isReactNativeInstalled()) {
    console.log('Installing React Native temporarily for TypeScript compilation...');
    runCommand('npm install --save-dev react-native --legacy-peer-deps');
    return true; // We installed it, so we should uninstall it later
  }
  return false; // It was already installed, don't uninstall
};

//* Uninstall React Native from devDependencies only, preserving peerDependencies
const uninstallReactNative = () => {
  console.log('Removing temporary React Native dependency from devDependencies...');

  // Read package.json
  const packageJsonPath = path.join(__dirname, '..', 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

  // Remove react-native from devDependencies if it exists
  if (packageJson.devDependencies && packageJson.devDependencies['react-native']) {
    delete packageJson.devDependencies['react-native'];

    // Ensure react-native stays in peerDependencies
    if (!packageJson.peerDependencies) {
      packageJson.peerDependencies = {};
    }
    packageJson.peerDependencies['react-native'] = '>=0.76.0';

    // Write back to package.json
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');

    // Run npm install to update node_modules and package-lock.json
    runCommand('npm install --legacy-peer-deps');

    console.log('React Native removed from devDependencies, preserved in peerDependencies');
  }
};

//* Generate TypeScript declarations
const generateTypeDeclarations = () => {
  console.log('Generating TypeScript declarations...');
  runCommand('tsc --p react-native/tsconfig.json');

  // Clean up module names (same as in grunt shell task)
  const dtsPath = path.join(__dirname, 'build', 'IntlTelInput.d.ts');
  if (fs.existsSync(dtsPath)) {
    let content = fs.readFileSync(dtsPath, 'utf8');
    content = content.replace(/\/index"/g, '"');
    // Replace module names to match the package name
    content = content.replace(/declare module "intl-tel-input/g, 'declare module "intl-tel-input');
    fs.writeFileSync(dtsPath, content);
    console.log('TypeScript declarations generated successfully');
  }
};

//* Main build function
const buildReactNative = async () => {
  let shouldUninstallReactNative = false;

  try {
    // Step 1: Install React Native temporarily if needed
    shouldUninstallReactNative = installReactNativeTemp();

    // Step 2: Generate TypeScript declarations
    generateTypeDeclarations();

    // Step 3: Build JavaScript bundles with esbuild
    const mainShared = {
      bundle: true,
      external: ["react", "react-native", "prop-types"],
      logLevel: "info",
      minify: false, //* Don't minify as (1) esbuild minify removes comments that we need to keep e.g. webpack import fix, (2) these files will be imported into other projects that will have their own minification process
      define: { "process.env.VERSION": `"${packageJson.version}"` },
    };

    console.log('Building React Native components...');

    //* React Native Component - CommonJS
    await build({
      ...mainShared,
      entryPoints: ["react-native/src/intl-tel-input/react-native.tsx"],
      format: "cjs",
      outfile: "react-native/build/IntlTelInput.cjs",
    });

    //* React Native Component - Default (ES Modules)
    await build({
      ...mainShared,
      entryPoints: ["react-native/src/intl-tel-input/react-native.tsx"],
      format: "esm",
      outfile: "react-native/build/IntlTelInput.js",
    });

    //* React Native Component With Utils - CommonJS
    await build({
      ...mainShared,
      entryPoints: ["react-native/src/intl-tel-input/reactNativeWithUtils.tsx"],
      format: "cjs",
      outfile: "react-native/build/IntlTelInputWithUtils.cjs",
    });

    //* React Native Component With Utils - Default (ES Modules)
    await build({
      ...mainShared,
      entryPoints: ["react-native/src/intl-tel-input/reactNativeWithUtils.tsx"],
      format: "esm",
      outfile: "react-native/build/IntlTelInputWithUtils.js",
    });

    console.log('React Native build completed successfully!');

  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  } finally {
    // Step 4: Clean up - uninstall React Native if we installed it
    if (shouldUninstallReactNative) {
      uninstallReactNative();
    }
  }
};

// Run the build
buildReactNative();
