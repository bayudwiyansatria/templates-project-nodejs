# Templates Project Node.js

[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.1%20adopted-ff69b4.svg)](CODE_OF_CONDUCT.md)
[![License](https://img.shields.io/github/license/bayudwiyansatria/templates-project-nodejs)](LICENSE)
[![Version](https://img.shields.io/github/package-json/v/bayudwiyansatria/templates-project-nodejs)](package.json)

> A reusable template for building, testing, documenting, and publishing Node.js libraries.

## Features

- **TypeScript-first**, with a layered `src/` and a single published surface
- **Four build outputs** from one entry — CommonJS, ESM, UMD, and type declarations
- **Layer boundary enforced by lint**, not by convention: leaf modules cannot reach into the domain layer
- **Collision-free imports** through a `@/*` path mapping, agreed by TypeScript, Jest, and Rollup
- **Jest** with coverage, and a spec that fails if the public surface changes shape
- **ESLint 10 flat config** and Prettier
- **Documentation that fails the build when it rots** — TypeDoc with validation and `treatWarningsAsErrors`
- **A documentation site** — landing page, API reference, coverage report, and HonKit book, served via Docker
- **GitHub Actions CI/CD** for build, test, docs, publish, release, and Pages
- **Community standards** — contributing, code of conduct, security, and support policies

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) >= 18
- [npm](https://www.npmjs.com/)

### Installation

```bash
git clone https://github.com/bayudwiyansatria/templates-project-nodejs.git
cd templates-project-nodejs
npm install
```

### Verify the toolchain

```bash
npm test        # lint, then Jest with coverage
npm run build   # four artifacts into lib/
```

## Project Structure

```text
├── src/                      # Source
│   ├── index.ts               # Public API barrel — the entire published surface
│   ├── core/                   # Domain layer: what the library does (rename when forking)
│   ├── types/                   # Shapes exchanged with callers
│   ├── constants/                # Values fixed for every caller
│   ├── exceptions/                # LibraryException and its subclasses
│   └── utils/                      # Helpers that do not know the domain
├── test/                     # Jest specs, mirroring src/
├── lib/                      # Build output (generated)
├── dist/                     # Docs, coverage, and book output (generated)
├── docs/                     # Developer book
│   ├── getting-started/       # Installation, quick start
│   ├── guides/                 # Task-oriented: forking, development, docs, publishing, Docker
│   ├── reference/               # Directory structure, API overview
│   ├── release-notes/            # Per-version release notes
│   ├── changes-log/               # Dated change log
│   ├── styles/                     # HonKit theme
│   ├── book.json                    # HonKit configuration
│   └── SUMMARY.md                    # HonKit table of contents
├── docker/                   # Documentation site image
│   ├── docs.Dockerfile
│   ├── docker-compose.docs.yaml
│   └── nginx/                 # Landing page and routing
├── .github/                  # Workflows and templates
├── eslint.config.ts
├── rollup.config.ts
├── typedoc.json
├── jest.config.json
└── tsconfig.json
```

Dependency arrows point _into_ the leaf layers — `types/`, `constants/`, `exceptions/`, `utils/` — and never back out,
which is what lets any of them be read, tested, or lifted elsewhere without dragging the domain along. A
`no-restricted-imports` rule in [eslint.config.ts](eslint.config.ts) enforces it. See
[Directory Structure](docs/reference/directory-structure.md).

## Available Scripts

| Script                      | Does                                                |
| --------------------------- | --------------------------------------------------- |
| `npm run build`             | Build all four artifacts into `lib/`                |
| `npm run dev`               | Rollup in watch mode                                |
| `npm test`                  | Lint, then run the suite                            |
| `npm run test:run`          | Jest with coverage into `dist/coverage/`            |
| `npm run lint` / `lint:fix` | ESLint over `src`, optionally fixing                |
| `npm run format`            | Prettier, writing in place                          |
| `npm run build:docs`        | TypeDoc API reference into `dist/docs/`             |
| `npm run build:docs:book`   | HonKit developer book into `dist/book/`             |
| `npm run build:static`      | The complete site into `dist/`                      |
| `npm run docker:serve:docs` | Serve the documentation site at `http://localhost/` |

## Using This Template

1. Update `package.json` metadata — `name`, `version` (start at `1.0.0`), `description`, repository URLs.
2. Rename `umdOptions.name` in [rollup.config.ts](rollup.config.ts); it is the browser global.
3. Rename `src/core/` after your domain.
4. Replace the placeholder exports and their specs.
5. Retarget the docs — `docs/book.json`, `typedoc.json`, `docker/nginx/index.html`, and this README.
6. Reset `CHANGELOG.md`, `docs/release-notes/`, and `docs/changes-log/` to your own history.

The full checklist, including the two things forks have silently inherited before, is in
[Using This Template](docs/guides/using-this-template.md).

## Documentation

- [Docs Home](docs/README.md)
- [Installation](docs/getting-started/installation.md) — requirements, install, and the four build outputs
- [Quick Start](docs/getting-started/quick-start.md) — build, test, and add your first export
- [Using This Template](docs/guides/using-this-template.md) — the fork checklist
- [Local Development](docs/guides/local-development.md) — every script and what it runs
- [Documentation](docs/guides/documentation.md) — TypeDoc, HonKit, and the gate that fails a build
- [Publishing](docs/guides/publishing.md) — versioning, the release dispatch, what ships
- [Docker](docs/guides/docker.md) — serving the documentation site locally
- [Directory Structure](docs/reference/directory-structure.md) — the layers and the one-way rule
- [API Overview](docs/reference/api-overview.md) — the published surface
- [Changelog](CHANGELOG.md)
- [Latest Release Notes](docs/release-notes/1.1.0.md)

### Documentation Site

```bash
npm run docker:build:docs
npm run docker:serve:docs
# Visit http://localhost/
```

Or without Docker:

```bash
npm run build:docs        # TypeDoc API reference -> dist/docs/
npm run build:docs:book   # HonKit developer book -> dist/book/
npm run build:static      # everything, plus the landing page -> dist/
```

## Contributing and Governance

- [Contributing Guide](CONTRIBUTING.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)
- [Security Policy](SECURITY.md)
- [Support Guide](SUPPORT.md)

## Authors

- [Bayu Dwiyan Satria](https://github.com/bayudwiyansatria) — Creator and Maintainer

## License

[MIT](LICENSE) © Bayu Dwiyan Satria
