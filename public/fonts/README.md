# Key Grotesk — licensed font files

This project's display typeface is **Key Grotesk**, used for major headlines,
section titles, and high-impact statements (see `PRODUCT.md` → Brand
Commitments → Typography system).

Licensed font files were not available at build time. Drop the licensed
files into this directory using the filenames below, and the `@font-face`
rules already wired up in `app/fonts.css` will pick them up automatically —
no code changes required.

```
public/fonts/key-grotesk/
  KeyGrotesk-Regular.woff2   (weight 400)
  KeyGrotesk-Medium.woff2    (weight 500)
  KeyGrotesk-SemiBold.woff2  (weight 600)
  KeyGrotesk-Bold.woff2      (weight 700)
```

Until these files are present, the site falls back to **Archivo** (a
self-hosted, freely-licensed grotesque with a similar structural character)
for display type, rather than a bare system font. This is a
development-only placeholder — it does not change the typographic
direction, which remains Key Grotesk. Once the licensed files land, Key
Grotesk takes over automatically and Archivo is never seen.
