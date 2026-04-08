// Removes HTML comments from every dist/**/*.html file.
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
process.chdir(ROOT);

function* walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(full);
    } else if (entry.isFile() && entry.name.endsWith(".html")) {
      yield full;
    }
  }
}

const htmlFiles = fs.existsSync("dist") ? [...walk("dist")] : [];
let updatedCount = 0;

for (const filePath of htmlFiles) {
  const input = fs.readFileSync(filePath, "utf8");
  const output = input.replace(/<!--[\s\S]*?-->/g, "");
  if (output !== input) {
    fs.writeFileSync(filePath, output);
    updatedCount += 1;
  }
}

console.log(
  `strip-html-comments: processed ${htmlFiles.length} files, updated ${updatedCount}`,
);
