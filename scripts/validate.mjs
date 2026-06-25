/**
 * Validate script — checks repo.json and each plugin for required SkyStream Gen 2 fields.
 * Run: node scripts/validate.mjs
 */

import { readFile, access } from "fs/promises";
import { join } from "path";

const ROOT = new URL("..", import.meta.url).pathname;

const REQUIRED_PLUGIN_FIELDS = [
  "packageName",
  "name",
  "version",
  "baseUrl",
  "isAdult",
  "contentRating",
];
const REQUIRED_REPO_FIELDS = ["name", "description", "version", "plugins"];

let errors = 0;
let warnings = 0;

function fail(msg) {
  console.error(`  ❌ ${msg}`);
  errors++;
}

function warn(msg) {
  console.warn(`  ⚠️  ${msg}`);
  warnings++;
}

function ok(msg) {
  console.log(`  ✅ ${msg}`);
}

async function fileExists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function validateRepo() {
  console.log("\n📋 Validating repo.json…");
  const repoPath = join(ROOT, "repo.json");

  if (!(await fileExists(repoPath))) {
    fail("repo.json not found");
    return [];
  }

  const repo = JSON.parse(await readFile(repoPath, "utf8"));

  for (const field of REQUIRED_REPO_FIELDS) {
    if (repo[field] === undefined) {
      fail(`repo.json missing field: ${field}`);
    } else {
      ok(`repo.json has "${field}"`);
    }
  }

  if (!Array.isArray(repo.plugins) || repo.plugins.length === 0) {
    fail("repo.json plugins array is empty");
    return [];
  }

  ok(`repo.json lists ${repo.plugins.length} plugin(s)`);
  return repo.plugins ?? [];
}

async function validatePlugin(plugin, index) {
  const name = plugin.name ?? plugin.packageName ?? `[${index}]`;
  console.log(`\n🔌 Plugin ${index + 1}: ${name}`);

  for (const field of REQUIRED_PLUGIN_FIELDS) {
    if (plugin[field] === undefined) {
      fail(`Missing required field: "${field}"`);
    } else {
      ok(`"${field}": ${JSON.stringify(plugin[field])}`);
    }
  }

  if (plugin.isAdult !== true) {
    fail(`isAdult must be exactly true (boolean), got: ${JSON.stringify(plugin.isAdult)}`);
  }

  if (plugin.contentRating !== "18+") {
    fail(`contentRating must be "18+", got: ${JSON.stringify(plugin.contentRating)}`);
  }

  if (!plugin.baseUrl || !/^https?:\/\//.test(plugin.baseUrl)) {
    fail(`baseUrl must be a valid http(s) URL, got: ${JSON.stringify(plugin.baseUrl)}`);
  }

  if (!plugin.pluginUrl) {
    fail("Missing pluginUrl — path to plugin.js relative to repo root");
  } else {
    const jsPath = join(ROOT, plugin.pluginUrl);
    if (await fileExists(jsPath)) {
      ok(`plugin.js found: ${plugin.pluginUrl}`);
    } else {
      fail(`plugin.js NOT found at: ${plugin.pluginUrl}`);
    }
  }

  if (!plugin.manifestUrl) {
    warn("Missing manifestUrl — path to plugin.json relative to repo root");
  } else {
    const jsonPath = join(ROOT, plugin.manifestUrl);
    if (await fileExists(jsonPath)) {
      ok(`plugin.json found: ${plugin.manifestUrl}`);

      const manifest = JSON.parse(await readFile(jsonPath, "utf8"));
      if (manifest.packageName !== plugin.packageName) {
        fail(
          `plugin.json packageName "${manifest.packageName}" does not match repo.json "${plugin.packageName}"`
        );
      } else {
        ok(`packageName matches between repo.json and plugin.json`);
      }
      if (manifest.isAdult !== true) {
        fail(`plugin.json isAdult must be true`);
      }
      if (manifest.contentRating !== "18+") {
        fail(`plugin.json contentRating must be "18+"`);
      }
    } else {
      fail(`plugin.json NOT found at: ${plugin.manifestUrl}`);
    }
  }
}

async function main() {
  console.log("🛸 SkyStream GayVN Extensions — Repository Validator\n");

  const plugins = await validateRepo();

  for (let i = 0; i < plugins.length; i++) {
    await validatePlugin(plugins[i], i);
  }

  console.log("\n" + "─".repeat(60));
  console.log(`  Plugins checked: ${plugins.length}`);
  console.log(`  Warnings:        ${warnings}`);
  console.log(`  Errors:          ${errors}`);
  console.log("─".repeat(60));

  if (errors === 0) {
    console.log("\n✨ Validation passed — repository is valid and ready to publish.");
    process.exit(0);
  } else {
    console.error(`\n💥 Validation failed with ${errors} error(s). Fix them before deploying.`);
    process.exit(1);
  }
}

main();
