# Imagery sources

## earth-atlantic-corridor.jpg

Real satellite imagery — NASA's "Blue Marble Next Generation" composite,
December 2004, true-color source: `world.topo.bathy.200412.3x5400x2700.jpg`.

- **Source:** NASA Earth Observatory / Visible Earth
  (https://visibleearth.nasa.gov/collection/1484/blue-marble),
  original file at
  https://eoimages.gsfc.nasa.gov/images/imagerecords/73000/73909/world.topo.bathy.200412.3x5400x2700.jpg
- **License:** NASA imagery is public domain (17 U.S.C. § 105 — works of the
  U.S. federal government carry no copyright). No attribution is legally
  required; NASA asks for credit as a courtesy ("NASA Earth Observatory").
- **Processing:** cropped to the North Atlantic corridor (~100°W–40°E,
  10°N–60°N — spanning the U.S. East Coast to Israel), converted to
  grayscale with autocontrast, mapped through a two-color duotone
  (`rgb(9,9,10)` shadow → `rgb(196,214,224)` highlight, matching the site's
  `--ink` / `--line-bright` tokens), resized to 1920px wide, saved as
  quality-82 JPEG (~180KB). Processing script: ad hoc Pillow script, not
  checked into the repo — reproducible via `public/imagery/source/`.
- **Original, unprocessed source file:** `source/nasa-blue-marble-original.jpg`
  (kept for re-processing if the treatment needs revisiting; not referenced
  by the site itself).
- **Used in:** the "global reach" full-bleed section between Credibility and
  GlobalReach, `app/components/`.

## night-network-europe-mideast.jpg

Real satellite imagery — NASA's "Black Marble" (Earth at Night) composite,
2012, source: `dnb_land_ocean_ice.2012.13500x6750.jpg`.

- **Source:** NASA Earth Observatory
  (https://earthobservatory.nasa.gov/features/NightLights),
  original file at
  https://eoimages.gsfc.nasa.gov/images/imagerecords/79000/79765/dnb_land_ocean_ice.2012.13500x6750.jpg
- **License:** public domain, same basis as the Blue Marble asset above.
- **Processing:** cropped to Europe through the Middle East (~10°W–50°E,
  15°N–60°N), grayscale with autocontrast, duotone (`rgb(9,9,10)` →
  `rgb(196,214,224)`), resized to 1600px wide. Original at
  `source/nasa-black-marble-original.jpg`.
- **Used in:** the Pivot section's full-bleed background ("Do you know who
  is working for you..."), and a second, differently-positioned crop of the
  same file (via CSS `background-position`, no second asset) as the inset
  plate in Credibility, captioned "Region of origin — Eastern Mediterranean."

## abyssal-texture-atlantic.jpg

Real satellite imagery — a crop of the same Blue Marble composite as
`earth-atlantic-corridor.jpg`, taken from open North Atlantic water (the
Sargasso Sea region, clear of any coastline) so it reads as pure abstract
bathymetric texture rather than recognizable geography.

- **Source / license:** identical to `earth-atlantic-corridor.jpg` above.
- **Processing:** grayscale, autocontrast, a cooler/dimmer duotone
  (`rgb(9,9,10)` → `rgb(130,150,160)`) than the other two assets since it's
  a background texture, not a focal image, resized to 1600px wide.
- **Used in:** the inset plate at the bottom of the Engagement section
  ("Control, at depth").

## GlobalReach.tsx skyline plate

Not a photograph — a drawn SVG plate (three-band atmospheric-perspective
skyline silhouette, dusk horizon-glow gradient, sparse lit-window detail,
vignette). No licensed aerial photography of the Miami or New York bases
was available at build time (see `PRODUCT.md` → Evidence on Hand). This is
the deliberate placeholder called for in that situation: swap the silhouette
for real aerial photography of the two bases when it's supplied, and the
targeting-frame chrome (reticle, corner brackets, motion) can stay as-is.
