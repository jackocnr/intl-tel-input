import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Dynamic import of the .ts source — requires running node with
// --experimental-strip-types (stable in node >=22.6).
const { default: supportedCountries } = await import('../src/js/data.ts');

const distImgDir = path.join(__dirname, '..', 'dist', 'img');
if (!fs.existsSync(distImgDir)) {
  fs.mkdirSync(distImgDir, { recursive: true });
}

const supportedCountryFilenames = supportedCountries
  .map((country) => `${country.iso2}.svg`)
  .sort();

// customise this number to change the size of the flags (NOTE: flags are 4x3 ratio)
// must be a multiple of 3, in order to have a (non-rounded) integer width
const TARGET_HEIGHT = 15;
const FLAG_ASPECT_RATIO = 4 / 3;
const TARGET_WIDTH = Math.round(TARGET_HEIGHT * FLAG_ASPECT_RATIO);
const FLAG_MARGIN = 0;

const specialCases = {
  'ac.svg': 'sh-ac.svg', // Ascension Island
  // Add more special cases here if needed
};

const handleSpecialCases = (filename) => specialCases[filename] || filename;

const createSprite = async (images, width, height, outputFile, format) => {
  const combinedImage = sharp({
    create: {
      width,
      height,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  });

  const compositeOperations = images.map((img) => ({
    input: img.buffer,
    left: img.offset,
    top: 0,
  }));

  let processedImage = combinedImage.composite(compositeOperations);

  if (format === 'webp') {
    processedImage = processedImage.webp({ quality: 100, lossless: true, effort: 6 });
  } else if (format === 'png') {
    processedImage = processedImage.png({ compressionLevel: 9, adaptiveFiltering: true, force: true });
  }

  await processedImage.toFile(outputFile);
};

const fileWarning = '/* THIS FILE IS AUTO-GENERATED. DO NOT EDIT. */';
const flagsPath = 'node_modules/flag-icons/flags/4x3';
const outputFile = 'src/css/flag-offsets.css';
const spriteFile1xWebP = 'dist/img/flags.webp';
const spriteFile2xWebP = 'dist/img/flags@2x.webp';
const spriteFile1xPNG = 'dist/img/flags.png';
const spriteFile2xPNG = 'dist/img/flags@2x.png';

const totalWidth = supportedCountryFilenames.length * (TARGET_WIDTH + FLAG_MARGIN) - FLAG_MARGIN;
const maxHeight = TARGET_HEIGHT;

let flagRules = '';
let currentOffset = 0;

const scaledImages1x = [];
const scaledImages2x = [];

for (const filename of supportedCountryFilenames) {
  const iso2 = filename.split('.')[0];
  const processedFilename = handleSpecialCases(filename);
  const imagePath = path.join(flagsPath, processedFilename);

  if (!fs.existsSync(imagePath)) {
    console.log(`WARNING: Missing flag image: ${imagePath} - skipping this flag.`);
    break;
  }

  const svgBuffer = fs.readFileSync(imagePath);

  const pngBuffer1x = await sharp(svgBuffer)
    .resize({
      width: TARGET_WIDTH,
      height: TARGET_HEIGHT,
      fit: sharp.fit.fill,
      position: sharp.strategy.centre,
    })
    .ensureAlpha()
    .png({ compressionLevel: 9, adaptiveFiltering: true, force: true })
    .toBuffer();

  const pngBuffer2x = await sharp(svgBuffer)
    .resize({
      width: TARGET_WIDTH * 2,
      height: TARGET_HEIGHT * 2,
      fit: sharp.fit.fill,
      position: sharp.strategy.centre,
    })
    .ensureAlpha()
    .png({ compressionLevel: 9, adaptiveFiltering: true, force: true })
    .toBuffer();

  scaledImages1x.push({ buffer: pngBuffer1x, offset: currentOffset });
  scaledImages2x.push({ buffer: pngBuffer2x, offset: currentOffset * 2 });

  //* Unit-less multiple of --iti-flag-width, so consumers can scale flags by overriding that one var.
  const offsetMultiplier = currentOffset / TARGET_WIDTH;
  flagRules += `.iti__${iso2} { --iti-flag-offset: ${-offsetMultiplier}; }\n`;

  currentOffset += TARGET_WIDTH + FLAG_MARGIN;
}

await createSprite(scaledImages1x, totalWidth, maxHeight, spriteFile1xWebP, 'webp');
await createSprite(scaledImages1x, totalWidth, maxHeight, spriteFile1xPNG, 'png');
console.log(`1x combined images saved as ${spriteFile1xWebP} and ${spriteFile1xPNG}`);

await createSprite(scaledImages2x, totalWidth * 2, maxHeight * 2, spriteFile2xWebP, 'webp');
await createSprite(scaledImages2x, totalWidth * 2, maxHeight * 2, spriteFile2xPNG, 'png');
console.log(`2x combined images saved as ${spriteFile2xWebP} and ${spriteFile2xPNG}`);

let outputFileContent = fileWarning + '\n\n';
//* Sprite dimensions expressed as unit-less multiples of --iti-flag-width / --iti-flag-height,
//* so the whole sprite scales when the consumer overrides those vars.
//* Flag height is derived from width via the 4:3 aspect ratio, so no --iti-flag-height export here.
outputFileContent += ':root {\n';
outputFileContent += `  --iti-flag-width: ${TARGET_WIDTH}px;\n`;
outputFileContent += `  --iti-flag-sprite-width: ${supportedCountryFilenames.length};\n`;
outputFileContent += `  --iti-flag-sprite-height: 1;\n`;
outputFileContent += '}\n\n';
outputFileContent += flagRules + '\n';
outputFileContent += fileWarning + '\n';

fs.writeFileSync(outputFile, outputFileContent);
console.log('CSS file generated successfully.');
