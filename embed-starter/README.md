# embed starter

A static, dependency-free starter based on the file layout discussed in chat. It includes a refreshed page shell, responsive CSS, a corrected alert component, a valid particle configuration, a small local particle renderer, and generated placeholder graphics.

## run locally

Use a local web server (the manifest and JSON loader use root-relative paths):

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## important scope note

This is an ordinary same-origin iframe demo: `index.html` embeds the project's own `preview.html`. It does not contain Scramjet, Wisp, a proxy service worker, arbitrary-destination iframe routing, or code for bypassing network restrictions. Only embed content you own or are authorized to use.

## files

- `index.html`, `preview.html` — static page and local iframe preview
- `stuff/css/styles.css`, `stuff/css/alert.css` — responsive styling and alert styling
- `stuff/js/app.js` — preview reload and notification behavior
- `stuff/js/particles.js`, `stuff/js/embedparticles.js` — small local background particle effect
- `stuff/json/alsomanifest.json`, `stuff/json/embed.json` — web app manifest and particle settings
- `stuff/logo.png`, `stuff/icons/*`, `stuff/images/noise.png` — generated placeholder assets

## fonts

The actual Quicksand, cloakfont, and Clash Display font binaries were not included in the chat. I did not fabricate font files or rename unrelated fonts to look like those families. The page uses system font fallbacks until you add the original licensed files.

## deployment

This is plain static HTML/CSS/JS; it can be hosted from a static hosting provider. No build command is required. Keep the root folder as the deployment output directory.
