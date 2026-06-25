/**
 * Build script for skystream-gayvn-extensions.
 *
 * All 16 plugins in this repository are already delivered as pre-built
 * single-file IIFE JavaScript (plugin.js) — no TypeScript compilation step
 * is required. This script:
 *
 *   1. Validates repo.json structure and all plugin manifests.
 *   2. Verifies every plugin.js and plugin.json file is present.
 *   3. Prints a summary.
 *
 * Run: node scripts/build.mjs
 */

import { readFile, access, readdir, stat } from "fs/promises";
import { join } from "path";

const ROOT = new URL("..", import.meta.url).pathname;
const PLUGINS_DIR = join(ROOT, "plugins");

async function fileExists(p) {
  try { await access(p); return true; } catch { return false; }
}

async function checkPlugin(dirName) {
  const dir = join(PLUGINS_DIR, dirName);
  const jsPath   = join(dir, "plugin.js");
  const jsonPath = join(dir, "plugin.json");

  const hasJs   = await fileExists(jsPath);
  const hasJson = await fileExists(jsonPath);

  if (!hasJs || !hasJson) {
    const missing = [!hasJs && "plugin.js", !hasJson && "plugin.json"].filter(Boolean).join(", ");
    console.error(`  ❌ ${dirName}: missing ${missing}`);
    return false;
  }

  const manifest = JSON.parse(await readFile(jsonPath, "utf8"));
  const checks = [
    ["packageName", typeof manifest.packageName === "string" && manifest.packageName.length > 0],
    ["name",        typeof manifest.name === "string" && manifest.name.length > 0],
    ["version",     typeof manifest.version === "number"],
    ["baseUrl",     /^https?:\/\//.test(manifest.baseUrl || "")],
    ["isAdult",     manifest.isAdult === true],
    ["contentRating", manifest.contentRating === "18+"],
  ];

  let ok = true;
  for (const [field, pass] of checks) {
    if (!pass) {
      console.error(`  ❌ ${dirName}/plugin.json: invalid or missing "${field}"`);
      ok = false;
    }
  }

  if (ok) {
    const jsBytes = (await stat(jsPath)).size;
    console.log(`  ✅ ${dirName.padEnd(18)} v${manifest.version}  ${manifest.baseUrl}  (${(jsBytes / 1024).toFixed(1)} KB)`);
  }
  return ok;
}

async function main() {
  console.log("🔧 Building SkyStream GayVN Extensions…\n");

  const repoPath = join(ROOT, "repo.json");
  if (!(await fileExists(repoPath))) {
    console.error("❌ repo.json not found");
    process.exit(1);
  }

  const repo = JSON.parse(await readFile(repoPath, "utf8"));
  console.log(`📋 repo.json: "${repo.name}" — ${repo.plugins?.length ?? 0} plugin(s)\n`);

  const entries = await readdir(PLUGINS_DIR);
  const dirs = [];
  for (const e of entries) {
    const s = await stat(join(PLUGINS_DIR, e));
    if (s.isDirectory()) dirs.push(e);
  }

  let passed = 0;
  let failed = 0;

  for (const d of dirs.sort()) {
    const ok = await checkPlugin(d);
    if (ok) passed++; else failed++;
  }

  console.log("\n" + "─".repeat(60));
  console.log(`  Total plugin directories: ${dirs.length}`);
  console.log(`  Passed: ${passed}   Failed: ${failed}`);
  console.log("─".repeat(60));

  if (failed > 0) {
    console.error("\n💥 Build finished with errors.");
    process.exit(1);
  } else {
    console.log("\n✨ Build complete — all plugins are valid and ready to serve.");
  }
}

main();
