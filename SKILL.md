---
name: scrollcraft
description: Design, build, and verify premium scroll-driven landing pages and scrollytelling experiences from a short user interview. Use for scroll-scrubbed video, pinned narratives, horizontal rails, continuous photographic worlds, Apple-style product storytelling, or a landing page that must feel bespoke rather than templated. Do not use for ordinary document-style sites that do not need scroll as an interaction timeline.
---

# scrollcraft

## Codex integration

This is the Codex port of Nate Herk's MIT-licensed
[scroll-craft](https://github.com/nateherkai/scroll-craft) skill. Its design
method, engine, references, and deterministic scripts are preserved from the
upstream project.

- Treat `<skill>` in every command as the absolute directory containing this
  `SKILL.md`. Quote the resolved path, especially on Windows or whenever it
  contains spaces. Never run a command with the literal `<skill>` placeholder.
- Use the shell and normal Codex file-editing tools for the bundled scripts and
  project files. Use a browser or the Playwright harness for visual checks, and
  use Codex's `view_image` capability to inspect local images and generated
  contact sheets rather than treating a green process exit as visual approval.
- The interview authorizes planning, not package installation, external asset
  uploads, publishing, or other external mutations. Obtain any host-required
  approval immediately before those actions. If an approval is denied, do not
  retry through another route.
- Asset generation is optional. Prefer assets the user already owns. For a
  missing still or raster edit, use Codex's built-in image-generation tool and
  follow the installed `imagegen` skill. This native route needs no project API
  key. If the tool is unavailable or repeats the same service failure after one
  retry, use supplied, procedural, or type-led assets when the brief allows;
  otherwise report the blocker. Never switch silently to an API, CLI, Gemini,
  or another provider.
- The reasoning model orchestrates the work; media tools produce media files.
  Do not assume a generated-video tool exists; inspect active capabilities.
  When none is exposed, use supplied footage or honest scroll-driven still
  choreography. If generated video is essential, stop before asset work and
  request supplied footage or an explicitly enabled connector. Read
  [references/media-providers.md](references/media-providers.md) before any
  generated-media work or provider comparison.

Scroll is the only input every visitor already knows how to use. This skill
treats it as a timeline: the wheel is a scrubber, the page is a film with real
text on top, and each section behaves differently enough that the visitor keeps
going to find out what the next one does.

**What you produce:** an interview brief, a page grammar, a customer-journey map,
a feeling curve with one engineered peak, a scroll score, one signature move,
an asset manifest, sourced or generated assets, one real HTML page on a
token-driven design floor, and a strip of screenshots proving it holds up at
every scroll position.

## What this is not

It is not "generate a flythrough and drop text on it." That approach produces
one device applied to a whole page, and every site built that way is
recognisable at a glance: same claymation diorama, same centred copy, same
`01 / 06` counter, same "scroll to explore" nudge. Five sections that behave
identically are one section shown five times.

Four rules follow from that, and they are the spine of this skill:

1. **Variety is the product.** An act-mode page uses at least four device
   families and never the same device twice in a row. Continuous-world mode is
   the deliberate exception: it has no acts or act devices, so it scores
   distinct legs, copy anchors, waypoints, and the signature move instead. Read
   [references/devices.md](references/devices.md) and
   [references/worldflight.md](references/worldflight.md).
2. **The world is photographic unless the brand is genuinely illustrated.**
   Soft matte low-poly clay diorama is banned as a default. Read
   [references/worlds.md](references/worlds.md).
3. **No continuous chain.** A single unbroken camera flight is the most
   expensive and most fragile thing you can build, and it exists only to hide
   cuts between scenes. Vary the device instead and the cut disappears for free,
   because the visitor is not watching one film. Chain only when the brief is
   literally "one continuous journey."
4. **A different world is not a different page.** The device kit varies how a
   page looks. Structure is a separate axis, and it has to be decided
   deliberately or every build inherits the same skeleton. The first four builds
   did exactly that. Read [references/uniqueness.md](references/uniqueness.md).

## Step 0: The interview

**Always interview the human before generating anything.** Not a brief you
inferred from the brand name, not a plan you present for approval. Actual
questions, asked, answered, written down. A page built from assumptions comes
back looking like the last page built from assumptions.

The skill is a range instrument, not a house style. The human brings intent and
whatever assets they own; the interview is where that turns into the right kind
of page: one unbroken world, distinct scenes, printed chapters, a live surface.
The skill can do any of them. The interview decides which.

Keep it short. Eight questions, asked in one pass:

1. **Vibe in three to five words**, plus up to three references from any medium.
   A film, an album cover, a shop, a magazine, a game. Not "sites you like":
   naming sites is how a page ends up looking like an existing site.
2. **The scroll journey, section by section, in their words.** What the visitor
   should hit first, what comes next, what the last thing is. Their sequence,
   not a menu you offered.
3. **The energy curve.** Where it should feel calm, where it should feel
   intense. A page that is loud the whole way is as flat as one that is quiet
   the whole way.
4. **How should someone feel while scrolling, stage by stage, and what is the
   ONE moment they should remember?** Energy is loudness. This is emotion, and
   the two do not line up: on a loud page the quiet act can be the most intense.
   The stage-by-stage answer becomes the feeling curve, the one moment becomes
   the peak. Both are required in BRIEF.md. See [references/feel.md](references/feel.md).
5. **One thing this site should do that no site they have seen does.** This is
   the seed of the signature move. Push for a real answer; "be memorable" is not
   one.
6. **How far from premium-minimal they want to go.** Offer the range in
   [uniqueness.md §5](references/uniqueness.md): brutalist, maximalist, playful,
   retro, dense, editorial, premium-minimal. Their answer governs the aesthetic
   family, not your taste.
7. **One unbroken world, or distinct scenes?** Should the whole page feel like
   one continuous place the scroll flies through (worldflight, see
   [references/worldflight.md](references/worldflight.md)), or like separate
   scenes, chapters, or cuts? This is the single biggest structural fork, and it
   is their call, not a device you pick later. Pair this answer with question 8:
   worldflight requires supplied flight footage or a callable video-generation
   capability. If neither exists, explain that constraint before recording a
   final choice. If they still want one unbroken world, record the capability
   blocker; never switch them to distinct scenes without confirmation.
8. **What assets do they already have?** Footage, photos, product shots, a
   brand kit, clips of themselves. Real assets anchor the world and cut
   generation work; the answer decides what gets graded and encoded versus
   generated. "Nothing" is a fine answer, but it promises only a native-still,
   procedural, or type-led world. It does not imply generated video.

Write the answers into `<workspace>/builds/<name>/BRIEF.md` before any act planning, in
their words, not paraphrased into marketing prose. Everything downstream reads
from that file.

BRIEF.md must contain, at minimum:

- The eight interview answers, verbatim.
- **The feeling curve.** One line per act, or per waypoint in worldflight: the
  emotion, then what on screen causes it. Written before the score exists,
  added to as the score fills in.
- **The peak.** The one moment, written as the sentence a visitor would say to
  a friend, plus which act or worldflight waypoint it lives in.
- **The completed tell-someone sentence.** "It's the site where ___", filled
  with an experience, not a device name.
- Any authored silence, so the verification pass can tell it from dead scroll.

[references/feel.md](references/feel.md) is the spec for all four.

**If the human is genuinely unreachable** and the run is fully autonomous, write
BRIEF.md yourself: answer all eight questions in the brand's voice, mark the file
`Self-authored, not interviewed` at the top, and say so in the final report. A
self-authored brief is a fallback, never the plan.

## Bootstrap

Environment, not a stage of the work. Do it once the interview is answered and
before Step 1.

**Run the preflight rather than checking by hand.** It knows the failure modes
that otherwise surface later as misleading errors, chiefly a stripped ffmpeg
that reports a missing filter as a syntax error in your command:

```bash
node "<skill>/scripts/doctor.mjs"
```

It reports Node, a full ffmpeg build, Playwright, Chrome, and the resolved
workspace. Node and workspace failures exit non-zero. ffmpeg is advisory until
the score uses supplied video, posters, or clip encoding; then it is required.
Say plainly which items are missing rather than working around them silently.
The script does not inspect hosted tools or make network calls. Check native
image-generation availability from the active Codex tools when the score needs
generated stills.

### The workspace

Builds and the fingerprint registry live in one directory, and **it is resolved,
never assumed**:

```bash
node "<skill>/scripts/workspace.mjs" --ensure     # prints it, creates it, seeds the registry
```

Resolution order, first hit wins:

1. `SCROLLCRAFT_HOME`
2. the nearest `.scrollcraft.json` walking up from the cwd, `{ "workspace": "..." }`
3. `<project root>/scrollcraft`, where the project root is the nearest ancestor
   holding a `.git`

So a build folder is `<workspace>/builds/<name>/` and the registry is
`<workspace>/FINGERPRINTS.md`. The registry starts **empty**: the gate exists to
stop you repeating yourself, so your first build has nothing to clear.

If you already keep builds somewhere else, drop a `.scrollcraft.json` at your
project root pointing at it and nothing moves.

### The rest

1. The media capability gate. Record whether the build has supplied footage,
   whether native still generation is available, and whether the selected
   grammar can be fulfilled without generated video. Do this before scoring
   devices or creating assets.
2. A brand kit if one exists (colours, logo, type, existing product shots). If
   the brand has a folder in this repo, read it before generating anything, and
   obey its hard rules. A brand that forbids invented numbers means no stat
   counters, however good they look.

Copy `engine/scrollcraft.js` and `engine/scrollcraft.css` into the build folder.
Never edit the engine per-project; it is the mechanism. Theme it with tokens and
write your own markup.

## Step 1: The brief, journey first

The subject is the user's to state. Ask it open, in plain prose, never as a
fabricated multiple-choice list of industries: a made-up menu biases them and
reads as you deciding their business for them.

Step 0 already covered vibe, sequence, energy and range. Do not ask any of it
again. Ask only what you cannot sensibly default:

1. **What is this, and who is it for?** One or two sentences in their words.
2. **What must the visitor believe by the end?** The single sentence the page
   exists to install. Not a feature list. If they give three, make them pick.
3. **What does the visitor do next?** One action. One label for it, used
   everywhere on the page.
4. **Any asset constraint question 8 did not answer?** Do not repeat the
   inventory. Only confirm unresolved ownership, file location, brand
   invariants, or exact product geometry that changes what may be generated.
5. **Art direction**: offer the worlds in [references/worlds.md](references/worlds.md)
   as a real choice, and say they can go their own way.

Then write the **journey** before anything else: four to seven beats, each one a
shift in what the visitor knows or feels.

```
1  Recognition   they see their own morning
2  Tension       the cost of it, named plainly
3  Turn          the thing that changes
4  Substance     why it holds up
5  Range         what they can choose
6  Commitment    the one action
```

Beats are the spine. Sections serve beats; a section that serves no beat is cut,
however nice the shot is. Show the journey to the user and get it right before
generating a single asset, because assets are the expensive part and the journey
determines every one of them.

## Step 2: Grammar, gate, then score

Three things in order, and the first two come before any act planning. Full
detail in [references/uniqueness.md](references/uniqueness.md).

**Pick a grammar.** Eight of them, and they are mutually exclusive because each
one forbids things the others require. Filmic one-shot is the one the first four
builds all used, so choosing it again means saying in the report why the other
seven did not fit the interview. Nav, hero and close all follow from the
grammar; they are not decided separately. Apply the media capability gate here:
continuous world requires real worldflight legs, and any filmic plan whose
argument depends on generated footage is unavailable without supplied footage
or an explicitly enabled video connector. Do not disguise a moving still as a
generated clip. When video is optional, offer a still-safe grammar and get
confirmation before changing the structural choice recorded in the interview.

**Invent the signature move.** One bespoke interaction that lives on this site
alone, coded in the page, not a parameter change to a kit device. Question 5 of
the interview is the seed. The engine stays untouched.

**Run the fingerprint gate.** Read your registry at
`<workspace>/FINGERPRINTS.md` (see **The workspace** in Bootstrap; run
`node "<skill>/scripts/workspace.mjs"` to print the path). The planned build must differ
from **every** existing row on at least 4 of 6 dimensions: grammar, nav
treatment, hero device, act-sequence shape, close pattern, signature move. Four
against each row individually. If it fails, change the plan, not the log.

**Write the feeling curve before the score table.** One line per act, or per
waypoint in worldflight: the emotion, then what causes it. Curve first, score
second, because a device or leg chosen before the feeling is looking for a
reason. Two adjacent beats with the same feeling means one is filler, and it is
cheaper to cut it here than after the assets exist. Name the peak in the same
pass and give it the largest span on the page. Full method in
[references/feel.md](references/feel.md).

For act mode, assign each beat a device. Do it deliberately and write it down as
a table:

| Beat | Device | Why this one |
|---|---|---|
| Recognition | `scrub` | The camera moving under the reader's own hand is the strongest possible open |
| Tension | `pin` + kinetic | Copy assembles line by line while the frame holds still |
| Turn | `reveal` | A wipe is a change of state, which is what this beat is |
| Substance | `scrub` (macro) | Texture at a scale the eye cannot get otherwise |
| Range | `pan` | Lateral travel reads as "options", vertical reads as "argument" |
| Commitment | `pin` + pointer | The page stops moving and starts responding |

That table is a **filmic** score with supplied or otherwise available footage.
It is the right shape for one grammar and the wrong shape for the other seven,
so read your grammar's leans-on and bans list before filling in a row.

For continuous-world mode, do not fabricate acts or a device table. Write a leg
score instead: beat, waypoint, intended feeling, source clip, weight, linger,
copy anchor, visual change, and why the transition can be seamless. One leg is
the peak and owns the largest weight. Read
[references/worldflight.md](references/worldflight.md) before writing it.

Act-mode checks before you build:

- The grammar's bans hold. A grammar that forbids `pin` forbids it here too,
  however well it would have worked.
- Four or more distinct device families. Fewer means the page has one idea.
- No device family twice in a row.
- At most two `scrub` acts. Video is the heaviest thing on the page, and the
  third one stops being a surprise.
- The act count and total length do not land in the 6-to-7 acts at 13.6-13.8vh
  band that all four prior builds hit. That band is a fingerprint dimension now.

Continuous-world checks before you build:

- Exactly one fixed stage and one spacer; no `sc-section` acts or act devices.
- Every beat maps to a leg/waypoint and every source clip exists before page
  implementation begins.
- Copy anchors and visible compositional changes vary across the track rather
  than repeating one overlay treatment.
- The seam and asset-quality laws in `worldflight.md` are satisfied.

Checks for both modes:

- No two adjacent beats carry the same feeling. If they do, one is filler.
- One act or worldflight leg is the peak and has the largest span by a visible
  margin. The beat before it is quieter.
- Every act or leg earns its scroll span. Total page or track length is 8 to 14
  viewport-heights. Longer is not more immersive, it is slower.

## Step 3: Source and create the assets

Read [references/assets.md](references/assets.md) for the native-still workflow,
supplied-footage pipeline, prompt scaffolds, portrait strategy, and still-motion
patterns. Read [references/media-providers.md](references/media-providers.md)
for the media request contract and dormant Gemini comparison boundary.

Short version:

1. Copy `templates/ASSET-MANIFEST.md` to the build root and record every source,
   candidate, prompt, reference role, inspection, and final workspace path.
2. Reuse the user's assets first. Grade and encode supplied footage locally:

   ```bash
   node "<skill>/scripts/encode.mjs" out/01-source-v01.mp4 assets/01-v01.mp4
   node "<skill>/scripts/encode.mjs" out/01-source-v01.mp4 assets/01-mobile-v01.mp4 mobile
   ```

3. For each missing still or raster edit, make one built-in image-generation
   call per asset or variant. Inspect local input images with `view_image` first,
   inspect every output, then copy the selected file from Codex's generated-image
   storage into the build's `assets/` directory. Never overwrite an existing
   asset; create a versioned sibling.
4. There is no native generated-video route. When video is optional, use pinned
   stills, transforms, clip-path reveals, crossfades, parallax, canvas, or
   kinetic type. When it is essential, report the capability gap before asset
   work instead of substituting a provider.
5. `gemini-ab` is dormant. Use it only when a callable connector advertises the
   needed capability and the user explicitly asks for the comparison. Never ask
   for a key or add a Gemini SDK for this path.

Three things that decide whether this looks premium or generated:

- **One style preamble, reused verbatim in every prompt.** This is what makes
  six separate images look like one shoot. Write it once, never paraphrase it.
- **Look at every asset before you use it.** Inspect the local file with
  `view_image`. Iterate with one targeted change; never accept a green tool exit
  as visual approval.
- **Encode for scrubbing, not playback.** `encode.mjs` sets a dense GOP because
  seeking walks from the previous keyframe. A normal web encode plays perfectly
  and scrubs like mud.

## Step 4: Build the page

Write real HTML. Real `<h1>`, real `<p>`, real links, real reading order. The
engine reads `data-sc-*` attributes off your markup and drives it; it never
generates DOM. A runtime that builds the page from a config object is exactly
why every site built on one looks the same.

Start from `references/template.html`. The device patterns are in
[references/devices.md](references/devices.md); the spacing, type, depth and
colour rules are in [references/taste.md](references/taste.md). Read taste.md
before writing markup, not after, and build without announcing the checklist.

Theme by overriding tokens, six values and two fonts:

```css
:root {
  --sc-canvas: #0A0806;  --sc-surface: #16110E;
  --sc-ink:    #F5EBDD;  --sc-ink-soft: #A2968A;
  --sc-accent: #FF5A3D;  --sc-accent-ink: #15110F;
  --sc-font-display: "Archivo", system-ui, sans-serif;
  --sc-font-text:    "Geist", system-ui, sans-serif;
}
```

## Step 5: Verify by scrolling it

Not optional, and not "it should work." A scroll page has no single state:
every position is a different frame, and the failures live between the two you
happened to look at. Full procedure: [references/verify.md](references/verify.md).

```bash
# Run from the build project. Installing this package may require network approval.
npm install playwright-core                    # once

# Start and retain this as a managed long-running terminal session.
node "<skill>/scripts/serve.mjs" --root . --port 4500

# Run these from another terminal session, then stop the server session.
node "<skill>/scripts/shoot.mjs" --url http://localhost:4500 --out lab/shots
node "<skill>/scripts/shoot.mjs" --url http://localhost:4500 --out lab/mobile --width 390 --height 844
node "<skill>/scripts/shoot.mjs" --url http://localhost:4500 --out lab/reduced --reduced-motion
```

The harness walks each act at six positions, waits for any scrub video to
actually settle, and reports **dead scroll**, **cues that never reach full
opacity**, and **contrast measured on the composited page at the brightest
frame under each line**. It writes a contact sheet.

Then do the part the harness cannot: **read `sheet.png`.** It proves a clip
advances; it cannot tell you the composition is good, the motion is smooth, or
the page means anything. Also tab through for focus order.

**Then run the feel check** ([references/feel.md §6](references/feel.md)). Scroll
the page cold, write one word per act for what you felt, and only then open
BRIEF.md and diff it against the intended curve. Where they disagree the page is
wrong, not the brief. Confirm on the sheet that the peak is the largest visual
change and holds the most scroll room, and that the last screen resolves instead
of fading to nothing.

**And say what a green run does not cover: a real phone.** Headless Chrome
cannot reproduce an iPhone's video decoder, autoplay policy, Low Power Mode,
or touch scrolling; a build once shipped four green rounds while the hero clip
sat frozen on the actual device. Mobile is a first-class target throughout,
not a pass at the end: portrait phone clips, touch-tuned lerp, grown tap
targets are all authored (see assets.md and verify.md). When any mobile defect
is reported, deploy `references/device-diag.html` beside the site on the
**first** round and let the device answer, rather than theorising from a
machine that cannot reproduce the failure. The full iOS clip-lifecycle notes
live in verify.md, "The phone is a different machine".

Fix what you found and shoot it again. Report what you actually verified and
what you did not.

## Hard rules

Ship-blockers, not preferences. Each one is a thing that makes a page read as
machine-made.

| Never | Instead |
|---|---|
| Clay diorama / low-poly / claymation as the default world | Photographic. See worlds.md |
| A "scroll" cue, arrow, or animated mouse icon | Nothing. They are looking at the hero; they know |
| `01 / 06` section counters | Delete them. Sequence is not information here |
| An eyebrow above every section heading | At most one per three sections. The heading carries itself |
| Em dash anywhere visible | Period, comma, colon, or parentheses |
| Centred copy in every act | Vary the anchor: lead, trail, centre, split |
| The same device twice in a row in act mode | Score the journey properly in Step 2 |
| Generating anything before the human has been interviewed | Run Step 0. Write `BRIEF.md`, or mark it self-authored |
| A page with no engineered peak, or with three competing ones | One peak act or leg. It gets the asset budget, the silence before it, and the most scroll room. See feel.md §2 |
| An ending that trails off, fades out, or just becomes a footer | The close resolves and holds. The last feeling is the one they carry |
| Planning the score before the feeling curve exists | Curve first, devices or legs second. See feel.md §1 |
| Shipping without one bespoke signature move | Invent one. A recoloured spotlight or a retuned tilt is not one. See uniqueness.md §3 |
| A build that clears fewer than 4 of 6 fingerprint dimensions against any existing row | Change the plan, not `FINGERPRINTS.md` |
| Editing the engine to get a bespoke behaviour | Bespoke JS in the page, driven off `--sc-p` and your own `data-sc-*` |
| Reaching for filmic one-shot because it is what the last build did | Pick from all eight grammars, and say why the other seven lost |
| A full-frame dark overlay to fix contrast | A scrim only where the text sits |
| Text baked into a generated image | Real markup, always. It is selectable, translatable and sharp |
| A silent fallback to an API, CLI, Gemini, or another provider | Stay on native tools or report the missing capability |
| Calling a moving still "generated video" | Name it still choreography; require footage or a video-capable connector for video |
| Invented statistics in a counter | Only real numbers. No number, no counter |
| `transition: all`, or animating width/height/top/left | `transform` and `opacity`; `clip-path` for wipes |
| Gradient text, neon glow, zero-offset coloured halo shadows | Weight and size for emphasis; shadows with offset and blur |
| Autoplaying audio, or any audio at all on a scrub clip | Strip the track. `encode.mjs` already does |
| Shipping without running Step 5 | Run Step 5 |

## Output

The build folder, including `BRIEF.md` and `ASSET-MANIFEST.md`, then a short report: the grammar and why
the other seven lost, the signature move, the fingerprint gate result against
each existing row, the journey, the feeling curve and the peak, the feel-check
diff (intended curve against felt curve, and what you changed), the act-mode
device score or worldflight leg score, what you sourced or generated, which provider route was used,
any explicitly requested A/B result, what you verified with screenshots, and anything you could not
verify. Say if the brief was self-authored rather than interviewed. Give the
local URL. Keep it brief; the page is the deliverable.

Then append the build's row to `<workspace>/FINGERPRINTS.md`.

Changes to the skill itself, and the build findings that drove them, are logged
in [CHANGELOG.md](CHANGELOG.md).
