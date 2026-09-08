#!/usr/bin/env node
/** Resolve a full ffmpeg build and pass every remaining argument to it. */

import { spawnSync } from "node:child_process";
import { pickFfmpeg } from "./ffmpeg-resolver.mjs";

let ffmpeg;
try {
  ffmpeg = pickFfmpeg();
} catch (error) {
  console.error(`ERROR: ${error.message}`);
  process.exit(1);
}

const args = process.argv.slice(2);
if (args.length === 1 && args[0] === "--print-path") {
  console.log(ffmpeg);
  process.exit(0);
}
if (!args.length) {
  console.error("usage: ffmpeg.mjs [--print-path] | <ffmpeg arguments...>");
  process.exit(1);
}

const result = spawnSync(ffmpeg, args, { stdio: "inherit", windowsHide: true });
if (result.error) {
  console.error(`ERROR: ${result.error.message}`);
  process.exit(1);
}
process.exit(result.status ?? 1);
