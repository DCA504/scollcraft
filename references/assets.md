# Assets

Use the least synthetic route that satisfies the brief:

1. Reuse the user's brand kit, photography, product shots, and footage.
2. Generate or edit missing stills with Codex's built-in `image_gen` tool.
3. Turn supplied footage into scrub-ready desktop and mobile encodes.
4. Use code-driven motion when a generated clip is optional.
5. Stop before asset work if the chosen concept requires generated video and no
   suitable video connector is callable.

The default route needs no project API key or provider SDK. Never silently
switch to a CLI, external API, Gemini, or another provider when a native tool
is absent or fails. Read [media-providers.md](media-providers.md) when
generating stills or when the user explicitly requests a provider comparison.

At project setup, copy
[templates/ASSET-MANIFEST.md](../templates/ASSET-MANIFEST.md) to
`<build>/ASSET-MANIFEST.md`. Record every user-supplied, generated, derived,
and final asset there. The manifest is the source of truth for provenance and
selection; temporary tool output is not.

---

## Plan the media before creating it

A six-act page usually needs four to six purposeful stills and no more than two
scrub clips. Zero clips is a complete route. Do not add video merely to meet an
asset count: the score still needs four device families, not four media types.

Give each planned asset:

- a stable asset ID and narrative role;
- its source route;
- a composition and copy-safe-space requirement;
- desktop and mobile intent;
- the normalized prompt and reference roles, when generated;
- a versioned candidate destination and a stable final destination.

Every clip needs a poster from its own first frame, not a separate lookalike.
Extracting it from the actual encoded file prevents a visible jump when video
first paints:

```bash
node "<skill>/scripts/ffmpeg.mjs" -n -i assets/01-v01.mp4 -frames:v 1 -vf scale=1600:-2 -c:v libwebp -quality 82 assets/01-poster-v01.webp
```

Use `ffmpeg.mjs`, not an unverified bare `ffmpeg`. The wrapper shares the
encoder's full-build resolver; a stripped binary may omit `scale`, `fps`,
`tile`, WebP, or analysis filters and report a misleading syntax error.

---

## Native still generation and editing

Codex's built-in `image_gen` is the default still provider. It is a hosted
harness tool, not an offline generator, but it does not require an
`OPENAI_API_KEY` in the project.

For each asset:

1. Inspect every local image that will be used as an edit target or reference
   with `view_image` before composing the request.
2. Write one shared visual-world preamble. Use it verbatim at the start of every
   related prompt, followed by a blank line and the asset-specific scene.
3. State reference roles explicitly: identity, product geometry, material,
   palette, composition, or style. Do not imply that a reference supplies all
   of them.
4. Name the subject placement and copy-safe area. Keep display text out of
   generated pixels unless the brief explicitly requires an image of existing
   physical text; page copy remains real markup.
5. Make one `image_gen` call for one distinct asset or variant. Do not bundle
   unrelated assets or ask a single call to decide the page's full media set.
6. Inspect every returned candidate visually. Reject drifted branding,
   malformed details, unusable crop, accidental text, style breaks, and
   composition that conflicts with the copy.
7. Copy the selected file out of Codex's transient
   `$CODEX_HOME/generated_images/...` location and into the build's
   `assets/` directory before referencing it from the page.
8. Never overwrite a candidate or final asset. Start with a descriptive name
   such as `hero-kitchen-v01.png`, then increment `v02`, `v03`, and so on.
9. Record the request, candidate, inspection, selection, dimensions, and final
   workspace path in `ASSET-MANIFEST.md`.

If native generation is unavailable or fails, keep user assets, choose a
code-native treatment, or report the limitation. Do not ask for a raw API key
and do not route through an unapproved provider.

For packaging, logos, or distinctive products, pass the real owned asset as an
identity/geometry reference on every applicable edit. A label or silhouette
that drifts between scenes breaks continuity before subtler style differences
are noticed.

---

## Generated video capability gate

This harness has no default native generated-video route. Before selecting a
filmic one-shot, a generated scrub clip, or a continuous photographic world,
separate two cases:

- **Video is optional.** Keep the concept and use still choreography: layered
  parallax, masked reveals, clip-path wipes, crossfades, transforms, canvas
  particles, pointer response, or kinetic type. Reduced motion must resolve to
  a clear static composition.
- **Generated video is essential.** Stop before generating adjacent assets.
  Explain that the concept requires supplied footage or a callable connector
  that advertises video generation. Do not quietly substitute a fake camera
  flight or change the agreed grammar.

A user-requested Gemini route remains governed by
[media-providers.md](media-providers.md). Connector presence alone is not
permission to use it.

---

## Supplied footage

Footage intended for scrubbing should be one continuous move in one direction:
a dolly, drift, orbit, or steady detail move. Cuts, reversals, snap zooms,
subjects leaving frame, and people entering midway all become jolts because the
reader controls the playhead and may stop on any frame.

Supplied footage is often flat or picture-profiled. Grade it into a pre-encode
intermediate rather than applying a full-frame CSS filter:

```bash
# 1. Measure the source.
node "<skill>/scripts/ffmpeg.mjs" -i raw.mov -vf signalstats,metadata=print:key=lavfi.signalstats.YMAX -f null -

# 2. Expand levels, make a restrained saturation adjustment, set fps and size.
# Tune the measured level values for the actual source; these are illustrative.
node "<skill>/scripts/ffmpeg.mjs" -n -i raw.mov -vf "colorlevels=rimin=0.09:gimin=0.09:bimin=0.09:rimax=0.64:gimax=0.64:bimax=0.64,eq=saturation=1.08,fps=30,scale=1920:-2" -c:v libx264 -crf 16 -an graded-v01.mp4

# 3. Create the dense-GOP scrub encode.
node "<skill>/scripts/encode.mjs" graded-v01.mp4 assets/01-v01.mp4
```

Measure before choosing grade values. Also:

- Trim before anything enters or exits.
- Target 24 to 30fps before `encode.mjs`; 60fps multiplies dense-keyframe size
  without helping hand-controlled motion.
- Re-encode cuts. Do not stream-copy them.
- Keep the subject in frame throughout and inspect the beginning, middle, and
  end rather than approving from playback alone.

---

## Encoding for scrubbing

`encode.mjs` sets a dense GOP (`-g 8` desktop, `-g 4` mobile), strips
audio, and adds `+faststart`:

```bash
node "<skill>/scripts/encode.mjs" graded-v01.mp4 assets/01-v01.mp4
node "<skill>/scripts/encode.mjs" graded-v01.mp4 assets/01-mobile-v01.mp4 mobile
```

A normal web encode places keyframes seconds apart. Seeking then makes the
decoder walk forward from the previous keyframe, so a file may play smoothly
and still scrub badly. Dense keyframes trade file size for responsive seeking.

Expect roughly 3MB for a five-second 1080p desktop clip and 1.5MB for its 720p
mobile version. Grain, foliage, and long footage can roughly double that.
`-crf 22` can reduce size when the visible trade is acceptable. Audio is
removed because these clips are scrubbed rather than played, and a muted track
is dead weight plus an autoplay-policy hazard.

Set `SCROLLCRAFT_FFMPEG` when the verified full ffmpeg build is not on PATH.

---

## Portrait and narrow screens

A 16:9 clip covering a 9:16 viewport crops to the middle third. Choose among:

1. **Compose for both.** Keep the subject in the center third and copy in a
   bottom band that survives a center crop.
2. **Use an owned portrait source.** Encode it separately, wire it through
   `data-sc-src-mobile`, and make the poster source match the clip:

   ```html
   <picture>
     <source media="(max-width: 860px)" srcset="assets/01-hero-portrait-poster-v01.webp">
     <img class="sc-stage__poster" src="assets/01-hero-poster-v01.webp" alt="">
   </picture>
   <video data-sc-scrub data-sc-src="assets/01-v01.mp4"
          data-sc-src-mobile="assets/01-portrait-v01.mp4" playsinline muted></video>
   ```

   ```bash
   node "<skill>/scripts/ffmpeg.mjs" -n -i portrait-src.mp4 -vf "scale=720:-2" -c:v libx264 -crf 20 -g 4 -pix_fmt yuv420p -an -movflags +faststart assets/01-portrait-v01.mp4
   # Deliberate center crop from landscape when the composition permits:
   # -vf "crop=ih*9/16:ih,scale=720:-2"
   ```

3. **Drop the clip on phones.** Serve its poster and let the copy and
   still-safe choreography carry the act. This is already the reduced-motion
   behavior, so the composition must support it.

Never pair a portrait poster with a landscape clip or vice versa. Do not use
`object-fit: contain` to hide the mismatch; letterboxing reads as a broken
embed.
