# Documentation

This is the developer book for `templates-project-nodejs`. The API reference is generated separately by TypeDoc from the
public surface in [`src/index.ts`](../src/index.ts); everything a generator cannot infer lives here.

## [`getting-started/`](./getting-started/)

Enough to get the project building and a first change landed.

| Doc                                                  | Covers                                                                                      |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| [installation.md](./getting-started/installation.md) | Requirements, install, the four build outputs and which `package.json` field points at each |
| [quick-start.md](./getting-started/quick-start.md)   | Build, test, and add your first export end to end                                           |

## [`guides/`](./guides/)

How to operate or maintain a specific part of the project — task-oriented, step-by-step.

| Doc                                                       | Covers                                                                                           |
| --------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| [using-this-template.md](./guides/using-this-template.md) | The fork checklist: what to rename, what to delete, what to verify before the first commit       |
| [local-development.md](./guides/local-development.md)     | Install, build, watch, test, lint, format, and what each script actually runs                    |
| [documentation.md](./guides/documentation.md)             | TypeDoc and HonKit, adding a page, keeping `SUMMARY.md` in sync, and the gate that fails a build |
| [publishing.md](./guides/publishing.md)                   | Versioning, the release dispatch, GitHub Packages, and exactly what ships in the tarball         |
| [docker.md](./guides/docker.md)                           | Building and serving this documentation site locally                                             |

## [`reference/`](./reference/)

How the project is arranged — reference material, not a walkthrough.

| Doc                                                          | Covers                                                                                  |
| ------------------------------------------------------------ | --------------------------------------------------------------------------------------- |
| [directory-structure.md](./reference/directory-structure.md) | Every directory under `src/`, the one-way dependency rule between them, and file naming |
| [api-overview.md](./reference/api-overview.md)               | The published surface at a glance, and the rule that decides what belongs in it         |

## [`release-notes/`](./release-notes/)

Per-version release notes (`1.0.0.md`, …) — what shipped in each release.

## [`changes-log/`](./changes-log/)

Dated engineering change log (`YYYY-MM-DD.md`) — a more granular, chronological record of what changed and why,
continued per work session.

---

Historical docs (`release-notes/`, `changes-log/`) are point-in-time records and are not updated retroactively when the
codebase moves on. `getting-started/`, `guides/`, and `reference/` are living docs — if you change the behavior they
describe, update them in the same change.
