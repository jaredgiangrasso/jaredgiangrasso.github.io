// Follows a deploy until the new build is live, logging progress. Runs as part of `postdeploy`.
//
//  1. GitHub Pages build: finds the "pages build and deployment" run for the commit gh-pages just
//     pushed, and reports its status until it finishes. Exits with an error if the build fails.
//  2. Live site: waits until https://jaredgiangrasso.com serves exactly dist/index.html.
//
//   node scripts/wait-for-deploy.ts
//   LIVE_URL=http://localhost:4321 node scripts/wait-for-deploy.ts   (skips step 1)
import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";

const REPO = "jaredgiangrasso/jaredgiangrasso.github.io";
const LIVE_URL = process.env.LIVE_URL ?? "https://jaredgiangrasso.com";
const BUILD_TIMEOUT = 8 * 60_000;
const LIVE_TIMEOUT = 5 * 60_000;

const started = Date.now();
const elapsed = () => {
  const s = Math.round((Date.now() - started) / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
};
const log = (msg: string) => console.log(`[${elapsed()}] ${msg}`);
const fail = (msg: string): never => {
  console.error(`[${elapsed()}] ${msg}`);
  process.exit(1);
};
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** The fields we use from GitHub's "list workflow runs" API. */
type WorkflowRun = { status: string; conclusion: string | null; html_url: string };

async function followPagesBuild(): Promise<void> {
  const sha = execSync("git ls-remote pages refs/heads/master").toString().split(/\s/)[0];
  log(`Deployed commit ${sha.slice(0, 7)} to ${REPO}`);
  let last = "";
  let linked = false;
  while (Date.now() - started < BUILD_TIMEOUT) {
    const res = await fetch(`https://api.github.com/repos/${REPO}/actions/runs?head_sha=${sha}`);
    if (!res.ok) return log(`GitHub API unavailable (${res.status}); skipping build status`);
    const run = ((await res.json()) as { workflow_runs?: WorkflowRun[] }).workflow_runs?.[0];
    if (run && !linked) {
      log(`Pages build: ${run.html_url}`);
      linked = true;
    }
    const status = run ? `${run.status}${run.conclusion ? ` (${run.conclusion})` : ""}` : "waiting for GitHub to start the build";
    if (status !== last) log(`Pages build: ${status}`);
    last = status;
    if (run?.status === "completed") {
      if (run.conclusion !== "success") fail(`Pages build failed: ${run.html_url}`);
      return;
    }
    await sleep(10_000);
  }
  fail("Timed out waiting for the GitHub Pages build");
}

async function waitForLiveSite(): Promise<void> {
  const built = readFileSync("dist/index.html", "utf8");
  log(`Waiting for ${LIVE_URL} to serve the new build...`);
  const deadline = Date.now() + LIVE_TIMEOUT;
  while (Date.now() < deadline) {
    // The query string skips the CDN cache.
    const live = await fetch(`${LIVE_URL}/?v=${Date.now()}`).then((r) => r.text(), () => "");
    if (live === built) return log("Live site is serving the new build");
    log("still serving the previous version");
    await sleep(10_000);
  }
  fail(`Timed out: ${LIVE_URL} is not serving dist/index.html`);
}

if (!process.env.LIVE_URL) await followPagesBuild();
await waitForLiveSite();
