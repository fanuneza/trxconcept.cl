import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const sourcePath = resolve(process.cwd(), "public/assets/css/style.css");
const targetPath = resolve(process.cwd(), "public/assets/css/style.min.css");

const sourceCss = readFileSync(sourcePath, "utf8");

const minifiedCss = sourceCss
  .replace(/\/\*[\s\S]*?\*\//g, "")
  .replace(/\s+/g, " ")
  .replace(/\s*([{}:;,])\s*/g, "$1")
  .replace(/;}/g, "}")
  .trim();

writeFileSync(targetPath, `${minifiedCss}\n`);
