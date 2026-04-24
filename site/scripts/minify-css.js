import fs from "node:fs";
import path from "node:path";
import { transform } from "esbuild";

const dir = "dist/css";
const files = fs.readdirSync(dir).filter((f) => f.endsWith(".css"));

await Promise.all(
  files.map(async (f) => {
    const filePath = path.join(dir, f);
    const src = await fs.promises.readFile(filePath, "utf8");
    const { code } = await transform(src, { loader: "css", minify: true });
    await fs.promises.writeFile(filePath, code);
  }),
);
