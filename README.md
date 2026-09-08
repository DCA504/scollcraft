# Scrollcraft for Codex

A Codex skill for designing, building, and verifying scroll-driven landing pages and scrollytelling experiences.

This repository contains only the reusable skill: instructions, engine, references, scripts, templates, and Codex agent metadata.

## Install

Copy this repository's contents into a folder named `scrollcraft` in either:

- `<your-project>/.agents/skills/scrollcraft/` for one project.
- `~/.codex/skills/scrollcraft/` for your personal Codex skills.

`SKILL.md` must be directly inside the `scrollcraft` folder. Do not copy the `.git` directory when installing from a local checkout.

## Use

Ask Codex: "Use $scrollcraft to build a scroll-driven landing page."

The skill begins with an interview about the page's story, visual direction, and available assets. See [SKILL.md](SKILL.md) for the full workflow.

Node.js is needed for the bundled scripts. Browser verification uses Playwright and Chrome; video processing additionally requires a full FFmpeg build. Run `node scripts/doctor.mjs` to check local prerequisites. Asset generation depends on tools available in your Codex session.

## Contents

- `SKILL.md`: workflow and design instructions.
- `engine/`: reusable JavaScript and CSS.
- `references/`: design and verification guidance.
- `scripts/`: workspace, media, serving, and screenshot utilities.
- `templates/`: asset manifest and fingerprint registry templates.
- `agents/`: Codex metadata.
- `CHANGELOG.md`: skill history.

## Attribution and license

Codex adaptation of Nate Herk's scroll-craft skill. Original copyright and MIT license are preserved in [LICENSE](LICENSE). See SKILL.md for the upstream project reference.
