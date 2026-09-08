import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

export function runCapture(command, args) {
  const result = spawnSync(command, args, {
    encoding: "utf8",
    windowsHide: true,
  });
  if (result.error || result.status !== 0) return null;
  return `${result.stdout || ""}${result.stderr || ""}`;
}

function winGetCandidates() {
  const userHome = process.env.USERPROFILE || process.env.HOME || "";
  const base = path.join(userHome, "AppData/Local/Microsoft/WinGet/Packages");
  if (!userHome || !fs.existsSync(base)) return [];

  const found = [];
  for (const packageDir of fs.readdirSync(base)) {
    if (!/^Gyan\.FFmpeg/i.test(packageDir)) continue;
    const packagePath = path.join(base, packageDir);
    for (const versionDir of fs.readdirSync(packagePath)) {
      const candidate = path.join(packagePath, versionDir, "bin/ffmpeg.exe");
      if (fs.existsSync(candidate)) found.push(candidate);
    }
  }
  return found;
}

export function pickFfmpeg() {
  const candidates = [
    process.env.SCROLLCRAFT_FFMPEG,
    "ffmpeg",
    ...winGetCandidates(),
    "/usr/local/bin/ffmpeg",
    "/opt/homebrew/bin/ffmpeg",
    "/usr/bin/ffmpeg",
    "/snap/bin/ffmpeg",
  ].filter(Boolean);

  for (const candidate of [...new Set(candidates)]) {
    const output = runCapture(candidate, ["-hide_banner", "-filters"]);
    if (output && output.split(/\r?\n/).length > 200) return candidate;
  }

  throw new Error("no full ffmpeg build found. Install one or set SCROLLCRAFT_FFMPEG.");
}

export function pickFfprobe(ffmpeg) {
  const pathLike = path.isAbsolute(ffmpeg) || ffmpeg.includes("/") || ffmpeg.includes("\\");
  const sibling = pathLike
    ? path.join(path.dirname(ffmpeg), process.platform === "win32" ? "ffprobe.exe" : "ffprobe")
    : "ffprobe";
  return runCapture(sibling, ["-version"]) ? sibling : null;
}
