# Documentation

Two generators, deliberately separate:

| Generator | Source              | Output       | Answers                     |
| --------- | ------------------- | ------------ | --------------------------- |
| TypeDoc   | JSDoc in `src/`     | `dist/docs/` | "what does this symbol do?" |
| HonKit    | Markdown in `docs/` | `dist/book/` | "how do I work on this?"    |

The split matters: anything a generator can derive from the code belongs in a doc comment, where it sits next to what it
describes and moves with it. Anything it cannot — why a layer exists, how to cut a release — belongs in `docs/`.

## The API reference

```bash
npm run build:docs
```

TypeDoc reads `src/index.ts` — the published surface, nothing else. Internals are not documented for consumers because
consumers cannot reach them.

### The gate

`typedoc.json` sets `treatWarningsAsErrors: true` alongside four validations, so `npm run build:docs` **fails** on:

| Validation      | Fails when                                                        |
| --------------- | ----------------------------------------------------------------- |
| `notDocumented` | an exported symbol has no doc comment                             |
| `invalidLink`   | a `{@link Something}` does not resolve                            |
| `notExported`   | a documented symbol references a type that is not itself exported |
| `rewrittenLink` | a relative link had to be rewritten to survive                    |

`skipErrorChecking` is `false`, so documentation cannot be generated from a program that does not compile.

This is the point of the whole setup. Documentation that is merely encouraged rots, because nothing fails when the code
moves on without it. A build that stops is a documentation defect you find at the time you introduce it.

### Writing a doc comment

````ts
/**
 * One sentence saying what it does.
 *
 * @remarks
 * The reasoning a reader cannot recover from the signature — why this exists,
 * what it deliberately does not do, which decision it encodes.
 *
 * @param name - What the caller supplies.
 *
 * @returns What comes back.
 *
 * @throws {@link LibraryException} with code `INVALID_ARGUMENT` when …
 *
 * @example
 * ```ts
 * greet('World')
 * ```
 *
 * @author Your Name
 * @version 1.0.0
 * @since 1.0.0
 */
````

Conventions this project follows:

- **`@version` and `@since` are `1.0.0` in every source file**, because this is a template — whatever is in `src/` is
  copied into a library that starts its own history at 1.0.0. Real release history lives in `CHANGELOG.md`,
  `docs/release-notes/`, and `package.json#version`. (A forked library should decide for itself whether to keep the tags
  accurate from that point on.)
- **Every barrel carries `@module`** describing what belongs in that layer and what may import it. Those blocks are
  where the architecture is explained, and they are read far more often than a separate document.
- **Do not restate what TypeScript already declares.** `@type`, `@property`, `@public`, `@private` duplicate the
  signature, and they drift the moment it changes.
- **Kind tags carry no argument.** `@class`, not `@class LibraryException` — TypeDoc drops the tag but keeps its
  argument, which then renders as a stray paragraph in the summary.

## The developer book

```bash
npm run build:docs:book
```

[HonKit](https://honkit.netlify.app/) — the maintained successor to GitBook, whose `gitbook-cli` no longer installs on
any current Node. Configuration is `docs/book.json`, theme is `docs/styles/website.css`, and `root` is `.` because
`book.json` already lives inside `docs/`.

### Adding a page

1. Write the Markdown under the directory that matches its kind:
   - `getting-started/` — enough to get running
   - `guides/` — task-oriented, step-by-step
   - `reference/` — how things are arranged
2. **Add it to `docs/SUMMARY.md`.** HonKit builds its navigation from that file alone; a page missing from it is a page
   nobody will find.
3. Add it to the matching table in `docs/README.md`.

### Living versus point-in-time

`getting-started/`, `guides/`, and `reference/` are living documents — if you change the behaviour they describe, update
them in the same change. `release-notes/` and `changes-log/` are records of a moment and are never edited afterwards to
match a later codebase.

## Both, plus coverage

```bash
npm run build:static
```

Assembles `dist/`: the landing page at the root, `docs/` (TypeDoc), `book/` (HonKit), and `coverage/` (Jest HTML). Serve
it with [Docker](./docker.md).
