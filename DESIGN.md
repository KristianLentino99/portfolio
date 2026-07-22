# Design System

## Direction

An editorial founder portfolio with controlled shonen-comic energy. Professional information leads; comic language appears in hard panel borders, Bangers display labels, orange stickers, ticker copy, and career "arcs." Light mode is the default, with a warm near-black dark mode.

## Color

- Brand orange: `#fe9a2e`
- Orange soft: `#ffb45e`
- Orange deep: `#a95400` for accessible text on light surfaces
- Light page: `#faf8f4`
- Light surface: `#ffffff`
- Light ink: `#141210`
- Dark page: `#151210`
- Dark surface: `#1e1a16`
- Dark ink: `#faf8f4`

All production tokens are expressed in OKLCH with hex fallbacks. Orange is the only accent hue.

## Typography

- Body and editorial display: Space Grotesk, weights 400, 500, and 700.
- Comic display and stickers: Bangers, regular.
- Data labels and ticker: the system monospace stack.
- Large headings use fluid `clamp()` sizing, line-height near 1.04, and letter spacing no tighter than `-0.03em`.
- Body copy stays within 65 to 75 characters per line and uses generous line height.

## Layout

- Maximum content width: 1200px.
- Desktop page gutter: 48px; tablet: 28px; mobile: 20px.
- Structural bands use full-width hairline dividers.
- Cards use 10px corners, 2px comic borders, and hard offset shadows only for selected emphasis.
- Responsive layouts collapse deliberately: two-column heroes to one column, metric bands from four to two columns, and content grids to horizontal scrollers or single columns where appropriate.

## Components

- Header: KL wordmark, route navigation, mobile menu, persisted theme toggle.
- Buttons: 6px corners, strong filled primary, outlined secondary, clear hover and focus states.
- MediaSlot: striped placeholder with a stable aspect ratio; renders supplied images from `public/assets` without changing layout.
- Sticker: orange or white comic label with restrained rotation and a hard or orange glow shadow.
- Panel: 2px border, 10px corner, optional orange emphasis.
- PowerBar: bordered pill with orange striped fill and reduced-motion fallback.
- ComicBalloon: one semantic callout primitive with `speech`, `shout`, `thought`, `whisper`, and `narration` variants; configurable tone, size, and tail direction. Irregular silhouettes keep an internal text-safe area and remain limited to one or two deliberate uses per viewport.
- Footer: copyright plus a contextual next-chapter link.

## Motion

- Page content uses a short, orchestrated entrance.
- Ticker movement, floating character badges, progress bars, and stat counters match the supplied prototype.
- All decorative or continuous motion is disabled when `prefers-reduced-motion: reduce` is active.

## Assets

Production imagery belongs in `public/assets`. Expected filenames are documented in `public/assets/README.md`; placeholders remain visually intentional until those files are supplied.
