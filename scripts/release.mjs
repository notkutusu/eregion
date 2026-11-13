import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const packageJsonPath = path.join(root, "package.json");

function run(command, args, options = {}) {
  return execFileSync(command, args, {
    cwd: root,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
    ...options,
  }).trim();
}

function tryRun(command, args) {
  try {
    return run(command, args);
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    console.error(`Command failed (soft): ${command} ${args.join(" ")}`);
    console.error(detail);
    return "";
  }
}

function parseVersion(version) {
  const match = /^(\d+)\.(\d+)\.(\d+)$/.exec(version);
  if (!match) {
    throw new Error(`Invalid version: ${version}`);
  }

  return {
    major: Number(match[1]),
    minor: Number(match[2]),
    patch: Number(match[3]),
  };
}

function formatVersion(parts) {
  return `${parts.major}.${parts.minor}.${parts.patch}`;
}

function bumpVersion(version, bump) {
  const parts = parseVersion(version);

  if (bump === "major") {
    return formatVersion({ major: parts.major + 1, minor: 0, patch: 0 });
  }

  if (bump === "minor") {
    return formatVersion({
      major: parts.major,
      minor: parts.minor + 1,
      patch: 0,
    });
  }

  return formatVersion({
    major: parts.major,
    minor: parts.minor,
    patch: parts.patch + 1,
  });
}

function getLatestTag() {
  const tags = tryRun("git", ["tag", "--list", "v*", "--sort=-v:refname"]);
  if (!tags) {
    return "";
  }

  return tags.split("\n")[0];
}

function getNpmVersion(packageName) {
  try {
    return run("npm", ["view", packageName, "version"], {
      env: {
        ...process.env,
        npm_config_loglevel: "error",
      },
    });
  } catch {
    return "";
  }
}

function getBaseVersion(packageName, packageVersion, latestTag) {
  if (latestTag) {
    return latestTag.replace(/^v/, "");
  }

  const npmVersion = getNpmVersion(packageName);
  if (npmVersion) {
    return npmVersion;
  }

  return packageVersion;
}

function getCommitsSince(latestTag) {
  const range = latestTag ? `${latestTag}..HEAD` : "HEAD";
  const log = tryRun("git", ["log", range, "--pretty=%B"]);
  return log;
}

function detectBump(commitLog) {
  if (/\[major\]/i.test(commitLog)) {
    return "major";
  }

  if (/\[minor\]/i.test(commitLog)) {
    return "minor";
  }

  return "patch";
}

function writePackageVersion(version) {
  const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8"));
  packageJson.version = version;
  writeFileSync(
    packageJsonPath,
    `${JSON.stringify(packageJson, null, 2)}\n`,
    "utf8",
  );
}

function ensureNpmAuth() {
  if (!process.env.NPM_TOKEN) {
    throw new Error("NPM_TOKEN is required to publish");
  }

  writeFileSync(
    path.join(root, ".npmrc"),
    `//registry.npmjs.org/:_authToken=${process.env.NPM_TOKEN}\n`,
    "utf8",
  );
}

function pushTag(version) {
  const tag = `v${version}`;
  run("git", ["config", "user.email", "ci@notkutusu.com"]);
  run("git", ["config", "user.name", "eregion-ci"]);
  run("git", ["tag", "-a", tag, "-m", `Release ${tag}`]);

  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
  if (token) {
    run("git", [
      "push",
      `https://x-access-token:${token}@github.com/notkutusu/eregion.git`,
      tag,
    ]);
    return;
  }

  run("git", ["push", "origin", tag]);
}

const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8"));
const packageName = packageJson.name;
const exactTag = tryRun("git", ["describe", "--tags", "--exact-match", "HEAD"]);

if (exactTag) {
  console.log(`HEAD is already tagged as ${exactTag}. Skipping publish.`);
  process.exit(0);
}

const latestTag = getLatestTag();
const commitLog = getCommitsSince(latestTag);

if (latestTag && !commitLog) {
  console.log(`No commits since ${latestTag}. Skipping publish.`);
  process.exit(0);
}

const bump = detectBump(commitLog);
const baseVersion = getBaseVersion(
  packageName,
  packageJson.version,
  latestTag,
);
const nextVersion = bumpVersion(baseVersion, bump);

console.log(`Base version: ${baseVersion}`);
console.log(`Bump: ${bump}`);
console.log(`Next version: ${nextVersion}`);

ensureNpmAuth();
writePackageVersion(nextVersion);
run("npm", ["publish", "--access", "public"]);
pushTag(nextVersion);

console.log(`Published ${packageName}@${nextVersion}`);
