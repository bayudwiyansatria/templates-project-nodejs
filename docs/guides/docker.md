# Working with Docker

Docker here builds and serves the documentation site — landing page, TypeDoc API reference, coverage report, and HonKit
book. This is a library, so there is no application image: the deliverable is the tarball in `lib/`, not a container.

## Layout

| File                              | Role                                                              |
| --------------------------------- | ----------------------------------------------------------------- |
| `docker/docs.Dockerfile`          | multi-stage: builds the project, then serves the result via nginx |
| `docker/docker-compose.docs.yaml` | composes the image and publishes port 80                          |
| `docker/nginx/index.html`         | the landing page served at the site root                          |
| `docker/nginx/default.conf`       | nginx routing                                                     |

## Prerequisites

```bash
docker --version
docker compose --version
```

## Build

```bash
npm run docker:build:docs
# docker compose -f docker/docker-compose.docs.yaml build --no-cache
```

Inside the container:

1. `npm ci`
2. `npm run build` — Rollup
3. `npm run test` — lint and the full Jest suite, which also produces `dist/coverage/`
4. `npm run build:docs` — TypeDoc
5. `npm run build:docs:book` — HonKit

The image is gated on tests passing, not just lint. If the build fails at step 3, the fix is in the code, not here.

## Serve

```bash
npm run docker:serve:docs
# docker compose -f docker/docker-compose.docs.yaml up
```

| Path                         | Serves                    |
| ---------------------------- | ------------------------- |
| `http://localhost/`          | landing page              |
| `http://localhost/docs/`     | TypeDoc API reference     |
| `http://localhost/coverage/` | Jest HTML coverage report |
| `http://localhost/book/`     | HonKit developer book     |

The compose file publishes `80:80`, so no port appears in the URL.

## Routing

`docker/nginx/default.conf` serves everything from `/usr/share/nginx/html` and falls through
`$uri → $uri.html → $uri/ → 404`, so HonKit's generated pages resolve without an explicit `.html`.

## Customising the landing page

Edit `docker/nginx/index.html` — the logo character, heading, intro copy, and the three navigation cards are plain HTML
and CSS with no build step. The `<head>` also carries the SEO meta and JSON-LD blocks, which name this template and need
updating in a fork. Rebuild after editing.

## Without Docker

```bash
npm run build:static
```

Produces the same `dist/` tree; serve it with any static file server.

## Commands

```bash
npm run docker:build:docs
npm run docker:serve:docs

docker compose -f docker/docker-compose.docs.yaml up -d     # detached
docker compose -f docker/docker-compose.docs.yaml down      # stop
docker compose -f docker/docker-compose.docs.yaml build --no-cache
```

## Troubleshooting

### "Docker daemon not running"

Start Docker Desktop, or on Linux: `systemctl start docker`.

### Port 80 already in use

Common — a local web server or another container usually has it. Change the host side of the mapping in
`docker/docker-compose.docs.yaml`:

```yaml
ports:
  - '8080:80'
```

and use `http://localhost:8080/`.

### The build fails at the test step

That is the gate doing its job. Run `npm test` locally; the container adds nothing to the diagnosis.

## Related

- [Docker documentation](https://docs.docker.com/)
- [HonKit documentation](https://honkit.netlify.app/)
