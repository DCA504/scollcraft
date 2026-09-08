# Asset manifest

Build: `<build-name>`  
Brief: `BRIEF.md`  
Updated: `YYYY-MM-DD`

Keep one row per user-supplied asset, generated candidate, derived encode, or
final selection. Never overwrite an existing file; increment its `vNN`
suffix. Paths are relative to the build and must resolve inside it.

| Asset ID | Role / act | Provider or source | Operation | Provider disclosure | Normalized prompt | References and roles | Intended composition | Observed dimensions | Candidate path | Status | Inspection result | Warnings | Final workspace path |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `<asset-id>` | `<narrative role>` | `user-assets / codex-native-image / supplied-footage-ffmpeg / code-motion / gemini-ab` | `supplied / still.generate / still.edit / video.generate / encode / derive` | `<connector-reported provider/model or n/a>` | `<canonical prompt or n/a>` | `<path: role; or n/a>` | `<ratio, subject placement, copy-safe area>` | `<width x height; duration/fps if video>` | `<versioned path or n/a>` | `candidate / rejected / selected` | `<pass/reject and visible findings>` | `<capability gaps, deviations, asymmetric comparison, or none>` | `<versioned assets/... path or n/a>` |

The row marked `selected` represents the final copy and must contain its
versioned `Final workspace path`. Do not introduce a separate `final` status.

## Provider comparison

Complete this section only when the user explicitly opted into a comparison.

Asset ID: `<asset-id>`  
Comparison type: `still provider A/B / asymmetric video page outcome`  
User opt-in recorded: `<yes, with request summary>`  
Connector capability inspected: `<provider disclosure and advertised operation>`

| Candidate | Brief fidelity (1-5) | Style continuity (1-5) | Composition / copy space (1-5) | Brand fidelity (1-5) | Technical integrity (1-5) | Total | Evidence |
|---|---:|---:|---:|---:|---:|---:|---|
| `codex-native-image-vNN` |  |  |  |  |  |  |  |
| `gemini-ab-vNN` |  |  |  |  |  |  |  |

Selected candidate: `<path>`  
Selection rule: higher total; native wins a tie  
User override, if any: `<none or reason>`  
Asymmetric-video warning, if applicable: `<generated video was compared with supplied footage or code-driven motion, not native generated video>`
