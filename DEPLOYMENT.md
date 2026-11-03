# Static deployment (port 8080)

The site is fully client-side (no backend), so it can be hosted as plain static files.

## Docker (e.g. Airbase)

```bash
docker build -t stackops-showcase .
docker run -p 8080:8080 stackops-showcase
# open http://localhost:8080
```

Runs nginx (unprivileged, non-root) on port 8080.

## Without Docker

```bash
bun install            # or npm install
STATIC_BUILD=1 bun run build
cp dist/client/_shell.html dist/client/index.html
cp -r static-assets/. dist/client/
```

Serve `dist/client/` with any static server on port 8080, falling back unknown paths to `index.html`.

## Notes

- `static-assets/` holds the logo, chart images and demo video. On Lovable hosting these are served by
  the platform; for self-hosting they must be copied into the output (the steps above do this).
  If an image or video is replaced in Lovable, re-download it into `static-assets/` at the same path.
- The normal `bun run build` (without `STATIC_BUILD=1`) is the Lovable/Cloudflare build and is unchanged.
