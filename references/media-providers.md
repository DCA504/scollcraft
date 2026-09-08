# Media providers

This contract keeps project media reproducible without coupling Scrollcraft to
an SDK or model name. Use it for native still generation and for an explicitly
requested provider comparison.

## Provider routing

| Provider/source | Default state | Capabilities | Requirements |
|---|---|---|---|
| `user-assets` | Enabled and preferred | Existing stills and footage | Confirm ownership/scope; no generation call |
| `codex-native-image` | Enabled when the harness exposes `image_gen` | `still.generate`, `still.edit` | Built-in harness tool; no project key, API client, or CLI fallback |
| `supplied-footage-ffmpeg` | Enabled | Grade, trim, poster, desktop/mobile encode | User-supplied footage and the verified local ffmpeg wrapper |
| `code-motion` | Enabled | Motion composed from stills and real markup | CSS, JavaScript, canvas, and a stable reduced-motion state |
| `gemini-ab` | Disabled | Only capabilities advertised by a callable connector | Inspected connector plus explicit user opt-in; no bundled SDK, key, model ID, or automatic install |

Never infer that a connector is present from provider documentation or a model
name in the prompt. Inspect the tools callable in the current harness. Never
request a raw Gemini key, install a connector, or activate `gemini-ab` merely
because it could improve an asset.

## MediaRequest

Normalize one request before selecting a provider. The same request is used
unchanged for every candidate in a comparison.

An adapter may translate field names into the callable connector's schema, but
it may not add creative content, alter reference roles, or change composition
intent. Record any unavoidable deviation as a warning before judging.

| Field | Required meaning |
|---|---|
| `assetId` | Stable lowercase identifier used in candidate and manifest paths |
| `operation` | `still.generate`, `still.edit`, or `video.generate` |
| `prompt` | Canonical prompt with the shared world preamble verbatim; no provider/model directives |
| `references` | Ordered local references as `{ path, role }`; roles state identity, geometry, material, palette, composition, or style |
| `aspectIntent` | Target orientation/ratio plus subject placement and copy-safe area |
| `destination` | Versioned candidate directory and intended workspace-local final path |
| `noOverwrite` | Always `true`; increment the version when any destination exists |

For `still.edit`, the edit target is the first reference and has role
`edit-target`. Inspect all local references with `view_image` before making
the request.

## MediaResult

Record one result per candidate in `ASSET-MANIFEST.md`.

| Field | Required meaning |
|---|---|
| `assetId` | The originating request ID |
| `provider` | Provider/source ID from the routing table |
| `capability` | Capability actually invoked |
| `candidatePath` | Versioned workspace-local candidate path |
| `dimensions` | Observed width, height, duration, and fps where applicable |
| `referencesUsed` | Reference paths and roles actually supplied |
| `providerDisclosure` | Connector-reported provider/model when available; never a hard-coded requirement |
| `inspection` | Pass/reject plus visible findings |
| `status` | `candidate`, `rejected`, or `selected` |
| `finalPath` | Workspace-local canonical asset path, only for the selected result |
| `warnings` | Capability gaps, deviations, or asymmetric-comparison note |

Temporary paths under `$CODEX_HOME/generated_images` are not valid
`candidatePath` or `finalPath` values. Copy the output into the build first.
The selected row is the final-copy record: set `status` to `selected` and write
its versioned `finalPath`; do not add a fourth `final` status.

## Explicit Gemini A/B

`gemini-ab` activates only when both conditions are true:

1. The user explicitly requests Gemini comparison for the named asset(s).
2. A currently callable connector has been inspected and advertises the
   required operation.

For a still comparison:

- Send the same normalized prompt, reference order, roles, and aspect intent to
  `codex-native-image` and `gemini-ab`.
- Save candidates separately under
  `lab/media-ab/<asset-id>/codex-native-image-vNN.*` and
  `lab/media-ab/<asset-id>/gemini-ab-vNN.*`. Neither is canonical while
  judging.
- Inspect both and score each from 1 to 5 on brief fidelity, style continuity,
  composition/copy space, brand fidelity, and technical integrity/artifacts.
  Use equal weights and record short evidence for every score.
- Select the higher total. A tie selects the native candidate. The user may
  override the selection; record the override rather than changing the scores.
- Copy the winner to the versioned final path and mark only that result
  `selected`.

Do not hard-code a Gemini generation model. Use only the connector's current
advertised schema and record its disclosure in the result.

## Gemini video is asymmetric

Offer Gemini video only when the inspected connector explicitly advertises
`video.generate` and the user opts in. Codex has no native generated-video
candidate in this workflow, so do not describe the result as provider-parity
A/B. Label it an **asymmetric page-outcome comparison** against supplied footage
or code-driven motion.

Evaluate the alternatives in the actual page on narrative fit, continuity,
scrub behavior when applicable, mobile outcome, reduced-motion outcome, and
performance. Keep the generated candidate noncanonical until that page-level
comparison is recorded.
