const fs = require('fs');
const path = require('path');
// ts-node allows us to require TypeScript files
require("ts-node").register();
const supportedCountries = require('../src/js/intl-tel-input/data.ts').default;

module.exports = function(grunt) {
  grunt.registerTask('generate-sprite', async function() {
    const done = this.async();
    // Require "sharp" on demand, else Travis was breaking with "Error: Could not load the "sharp" module using the linux-x64 runtime" when Travis doesn't even use this task
    const sharp = require('sharp');
    // ensure /build/img/ dir exists before trying to write to it
    const buildImgDir = path.join(__dirname, '..', 'build', 'img');
    if (!fs.existsSync(buildImgDir)) {
      fs.mkdirSync(buildImgDir, { recursive: true });
    }

    const supportedFilenames = supportedCountries.map(country => `${country.iso2}.svg`).sort();

    // customise this number to change the size of the flags (NOTE: flags are 4x3 ratio)
    const TARGET_HEIGHT = 12;

    const TARGET_WIDTH = (TARGET_HEIGHT / 3) * 4;
    const FLAG_MARGIN = 0;

    const specialCases = {
      'ac.svg': 'sh-ac.svg', // Ascension Island
      // Add more special cases here if needed
    };

    const handleSpecialCases = (filename) => specialCases[filename] || filename;

    const generateFlagMetadataAndSprite = async () => {
      try {
        const fileWarning = "//* THIS FILE IS AUTO-GENERATED. DO NOT EDIT.";
        const flagsPath = 'node_modules/flag-icons/flags/4x3';
        const outputFile = 'src/css/_metadata.scss';
        const spriteFile1xWebP = "build/img/flags.webp";
        const spriteFile2xWebP = "build/img/flags@2x.webp";
        const spriteFile1xPNG = "build/img/flags.png";
        const spriteFile2xPNG = "build/img/flags@2x.png";
        let outputFileContent = '';

        let totalWidth = supportedFilenames.length * (TARGET_WIDTH + FLAG_MARGIN) - FLAG_MARGIN;
        const maxHeight = TARGET_HEIGHT;

        let flagsMetadata = "$flags: (\n";
        let currentOffset = 0;

        const scaledImages1x = [];
        const scaledImages2x = [];

        for (const filename of supportedFilenames) {
          const countryCode = filename.split('.')[0];
          const processedFilename = handleSpecialCases(filename);
          const imagePath = path.join(flagsPath, processedFilename);
          const imagePathExists = fs.existsSync(imagePath);

          if (!imagePathExists) {
            console.log(`WARNING: Missing flag image: ${imagePath} - skipping this flag.`);
            break;
          }

          const svgBuffer = fs.readFileSync(imagePath);

          const pngBuffer1x = await sharp(svgBuffer)
            .resize({
              width: TARGET_WIDTH,
              height: TARGET_HEIGHT,
              fit: sharp.fit.fill,
              position: sharp.strategy.centre
            })
            .ensureAlpha()
            .png({ compressionLevel: 9, adaptiveFiltering: true, force: true })
            .toBuffer();

          const pngBuffer2x = await sharp(svgBuffer)
            .resize({
              width: TARGET_WIDTH * 2,
              height: TARGET_HEIGHT * 2,
              fit: sharp.fit.fill,
              position: sharp.strategy.centre
            })
            .ensureAlpha()
            .png({ compressionLevel: 9, adaptiveFiltering: true, force: true })
            .toBuffer();

          scaledImages1x.push({
            buffer: pngBuffer1x,
            offset: currentOffset
          });

          scaledImages2x.push({
            buffer: pngBuffer2x,
            offset: currentOffset * 2
          });

          flagsMetadata += `  ${countryCode}: (\n`;
          flagsMetadata += `    offset: ${-currentOffset}px,\n`;
          flagsMetadata += "  ),\n";

          currentOffset += TARGET_WIDTH + FLAG_MARGIN;
        }
        flagsMetadata += ");";

        // Create 1x sprites
        await createSprite(scaledImages1x, totalWidth, maxHeight, spriteFile1xWebP, 'webp');
        await createSprite(scaledImages1x, totalWidth, maxHeight, spriteFile1xPNG, 'png');
        console.log(`1x combined images saved as ${spriteFile1xWebP} and ${spriteFile1xPNG}`);

        // Create 2x sprites
        await createSprite(scaledImages2x, totalWidth * 2, maxHeight * 2, spriteFile2xWebP, 'webp');
        await createSprite(scaledImages2x, totalWidth * 2, maxHeight * 2, spriteFile2xPNG, 'png');
        console.log(`2x combined images saved as ${spriteFile2xWebP} and ${spriteFile2xPNG}`);

        // Generate SCSS content
        outputFileContent += fileWarning + "\n\n";

        outputFileContent += `$flags-sprite-1x: (\n`;
        outputFileContent += `  height: ${maxHeight}px,\n`;
        outputFileContent += `  width: ${totalWidth}px,\n`;
        outputFileContent += ");\n\n";

        outputFileContent += `$flag-width: ${TARGET_WIDTH}px;\n\n`;
        outputFileContent += `$flag-height: ${TARGET_HEIGHT}px;\n\n`;

        outputFileContent += flagsMetadata + "\n\n";
        outputFileContent += fileWarning + "\n";

        fs.writeFileSync(outputFile, outputFileContent);
        console.log('SCSS file generated successfully.');
        done();
      } catch (error) {
        console.error('Error:', error);
        done(error);
      }
    };

  const createSprite = async (images, width, height, outputFile, format) => {
      const combinedImage = sharp({
        create: {
          width: width,
          height: height,
          channels: 4,
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        }
      });

      const compositeOperations = images.map((img) => ({
        input: img.buffer,
        left: img.offset,
        top: 0
      }));

      let processedImage = combinedImage.composite(compositeOperations);

      if (format === 'webp') {
        processedImage = processedImage.webp({
          quality: 100,
          lossless: true,
          effort: 6
        });
      } else if (format === 'png') {
        processedImage = processedImage.png({
          compressionLevel: 9,
          adaptiveFiltering: true,
          force: true
        });
      }

      await processedImage.toFile(outputFile);
    };

    generateFlagMetadataAndSprite();
  });
};