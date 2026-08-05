# Installation

## Requirements

- [Node.js](https://nodejs.org/) >= 18
- [npm](https://www.npmjs.com/)

Node 18 is the floor because the toolchain requires it, not the output — the bundles target ES2020 and run anywhere that
does.

## Install the published package

The package is published to GitHub Packages, not the public npm registry, so npm needs to be told where the scope lives.
`.npmrc` in this repository already does that for contributors; a consuming project needs its own line:

```bash
echo "@bayudwiyansatria:registry=https://npm.pkg.github.com" >> .npmrc
npm install @bayudwiyansatria/templates-project-nodejs
```

## Install for development

```bash
git clone https://github.com/bayudwiyansatria/templates-project-nodejs.git
cd templates-project-nodejs
npm install
```

Then confirm the toolchain is healthy before changing anything:

```bash
npm run build
npm test
```

## Build outputs

`npm run build` writes four files to `lib/`. Each is named in `package.json`, and the extensions are load-bearing:

| Output                  | Format            | Reached through                                           |
| ----------------------- | ----------------- | --------------------------------------------------------- |
| `lib/index.min.cjs`     | CommonJS          | `main`, and `exports["."].require`                        |
| `lib/index.min.mjs`     | ESM               | `module`, and `exports["."].import`                       |
| `lib/index.min.umd.cjs` | UMD               | a browser `<script>` tag; global `TemplatesProjectNodejs` |
| `lib/index.d.ts`        | Type declarations | `types`, and `exports["."].types`                         |

Source maps are emitted beside each bundle and are excluded from the published tarball by
`"files": ["lib/", "!lib/*.map"]`.

### Why `.cjs` and not `.js`

`package.json` declares `"type": "module"`, which makes Node read every `.js` file in the package as ESM. A CommonJS
bundle written to `lib/index.min.js` therefore parses as ESM, and `require()` of it returns nothing usable — silently,
because nothing fails at build time. `.cjs` is unambiguous whatever `type` says. If you change the CommonJS output path,
keep the extension.

## Next

- [Quick Start](./quick-start.md) — build, test, and add your first export
- [Using This Template](../guides/using-this-template.md) — what to change before your first commit
