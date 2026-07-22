# WalkingSprite component

## Purpose

A reusable, decorative pixel-art component that animates Kristian's walking sprite (from a provided sprite sheet) back and forth across its container. Standalone component only — placement on a page is a separate follow-up.

## Asset

- Source: `/Users/kristianlentino/Downloads/kristian_walking.png` — 1024×1024, RGBA, genuinely transparent background (verified: corner/background alpha = 0).
- Grid: 4 columns × 2 rows, 256×512 px per frame.
  - Row 0 (top): character facing/walking **right**.
  - Row 1 (bottom): character facing/walking **left**.
- Destination: `public/assets/avatars/kristian-walk.webp`, converted **losslessly** (not through the project's `optimize-images` lossy pipeline, which only rewrites `.png/.jpg/.jpeg` — shipping directly as `.webp` bypasses it). Lossy re-encoding would blur pixel-art edges, which is especially visible once the sprite is scaled up.

## Component: `src/components/WalkingSprite.tsx`

```ts
interface WalkingSpriteProps {
  direction?: 'left' | 'right' // initial travel direction, default 'right'
  size?: number                // rendered frame height in px, default 96
  className?: string
}
```

- Follows existing component conventions (see `PowerBar.tsx`, `MediaSlot.tsx`): plain function component, `className` merge via `.trim()`, no external state libs.
- Markup: one relatively-positioned wrapper (`overflow: hidden`, height = `size`, width = 100% of parent) containing one absolutely-positioned "figure" div (width = `size / 2`, height = `size`) whose `background-image` is the sprite sheet.
- **Leg-cycle animation** (always running, independent of travel direction): `background-size: 400% 200%`; a CSS `steps(4)` keyframe animates `background-position-x` from 0% to 100%, looping infinitely, to step through the 4 columns of the active row.
- **Row selection**: `background-position-y` is set directly (0% for right / 100% for left) based on current direction state — a plain style value, not animated, so there's no cross-fade between rows.
- **Traverse animation**: CSS keyframes move the figure from one edge of the wrapper to the other using `left: 0%→100%` combined with `transform: translateX(0 / -100%)` (the element's own edge defines the travel bound, not a fixed pixel width) — works at any container width, no JS measurement/ResizeObserver needed.
- **Direction flip**: React state (`leg: 'left' | 'right'`, initialized from the `direction` prop) toggles in the traverse animation's `onAnimationEnd` handler. The figure div is keyed on `leg` so remounting restarts the keyframe cleanly for the new leg. This produces an indefinite bounce between the two edges.
- **Reduced motion**: reads `window.matchMedia('(prefers-reduced-motion: reduce)').matches` once (same pattern as `useTheme.ts`). If true, skip all animation/state entirely and render a single static frame (first frame of the initial direction, centered, no traverse). This is deliberate rather than relying solely on the site's global reduced-motion CSS override, because that override collapses animation durations to ~0 without stopping the `onAnimationEnd`-driven direction-flip loop.
- **Styling**: `image-rendering: pixelated` on the figure div to keep crisp pixel edges at any scale.
- **Accessibility**: purely decorative → `aria-hidden="true"`, no alt text/role needed.

## Storybook

`WalkingSprite.stories.tsx` following existing conventions (`tags: ['ai-generated']`, `satisfies Meta<typeof WalkingSprite>`), with a `Default` story (right-facing) and a `FacingLeft` story, each with a light `play` smoke assertion (element renders, `aria-hidden` present).

## Out of scope

- Where the component gets placed on the actual site (footer/hero/etc.) — not decided yet, left for a later step.
- Idle walk-in-place mode — not needed since "walk across container" was chosen as the only behavior.
