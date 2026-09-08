#!/usr/bin/env node
/**
 * Cross-platform scrub-video encoder.
 *
 * A normal web encode uses sparse keyframes and seeks poorly when scroll is
 * the playhead. This script mirrors encode.sh with Node so Codex can run the
 * same deterministic operation from PowerShell, Bash, or another host shell.
 *
 *   node encode.mjs in-v01.mp4 out-v01.mp4
 *   node encode.mjs in-v01.mp4 out-mobile-v01.mp4 mobile
 *   node encode.mjs in-v01.mp4 out-v01.mp4 desktop 23
 */

import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { pickFfmpeg, pickFfprobe, runCapture } from "./ffmpeg-resolver.mjs";

const fail = (message) => {
  console.error(`ERROR: ${message}`);
  process.exit(1);
};

const args = process.argv.slice(2);
if (args.length < 2 || args.length > 4) {
  fail("usage: encode.mjs <in> <out> [mobile|desktop] [crf]");
}

const [input, output, mode = "desktop", crfArgument] = args;
if (!fs.existsSync(input)) fail(`input does not exist: ${input}`);
if (mode !== "desktop" && mode !== "mobile") {
  fail(`mode must be desktop or mobile, got: ${mode}`);
}

const mobile = mode === "mobile";
const scale = mobile ? "scale=-2:720" : "scale=-2:1080";
const gop = mobile ? 4 : 8;
const defaultCrf = mobile ? 24 : 20;
const crfText = crfArgument ?? process.env.SCROLLCRAFT_CRF ?? String(defaultCrf);
if (!/^\d+$/.test(crfText) || Number(crfText) < 1 || Number(crfText) > 51) {
  fail(`crf must be an integer from 1 through 51, got: ${crfText}`);
}

const outputPath = path.resolve(output);
if (fs.existsSync(outputPath)) {
  fail(`output already exists; choose a versioned filename: ${outputPath}`);
}

let ffmpeg;
try {
  ffmpeg = pickFfmpeg();
} catch (error) {
  fail(error.message);
}
const ffprobe = pickFfprobe(ffmpeg);
fs.mkdirSync(path.dirname(outputPath), { recursive: true });

const result = spawnSync(ffmpeg, [
  "-n",
  "-hide_banner",
  "-loglevel", "error",
  "-i", input,
  "-an",
  "-vf", `${scale}:flags=lanczos,format=yuv420p`,
  "-c:v", "libx264",
  "-profile:v", "high",
  "-preset", "slow",
  "-crf", crfText,
  "-g", String(gop),
  "-keyint_min", String(gop),
  "-sc_threshold", "0",
  "-movflags", "+faststart",
  outputPath,
], { stdio: "inherit", windowsHide: true });

if (result.error) fail(result.error.message);
if (result.status !== 0) fail(`ffmpeg exited with status ${result.status}`);

const bytes = fs.statSync(outputPath).size;
const units = ["B", "KB", "MB", "GB"];
let size = bytes;
let unit = 0;
while (size >= 1024 && unit < units.length - 1) {
  size /= 1024;
  unit += 1;
}

let duration = "unknown";
if (ffprobe) {
  const output = runCapture(ffprobe, [
    "-v", "error",
    "-show_entries", "format=duration",
    "-of", "csv=p=0",
    outputPath,
  ]);
  const seconds = output ? Number(output.trim()) : Number.NaN;
  if (Number.isFinite(seconds)) duration = `${seconds.toFixed(2)}s`;
}

console.log(`${outputPath}  ${size.toFixed(unit ? 1 : 0)}${units[unit]}  ${duration}  gop=${gop}  crf=${crfText}`);
