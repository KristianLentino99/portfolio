# WalkingSprite Component Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a standalone, reusable `WalkingSprite` React component that animates Kristian's pixel-art walking sprite sheet back and forth across its container, matching the site's existing retro/pixel-art component conventions.

**Architecture:** A lossless WebP sprite sheet asset feeds a single component that combines two independent CSS animations on one element — an infinite `steps(4)` leg-cycle and a finite edge-to-edge traverse — with React state flipping direction (and the active sprite row) each time the traverse animation completes.

**Tech Stack:** React 19 (function components, no external state libs), plain CSS keyframes in `src/styles.css`, Vitest + Testing Library for component tests, Storybook (`@storybook/react-vite`) for the story file. Biome for lint/format.

## Global Constraints

- Component file must default-export exactly one component (biome rule `useComponentExportOnlyModules`); a co-located `interface ...Props` type export is fine (matches `PowerBar.tsx`, `ComicBalloon.tsx`).
- Formatting: single quotes, double-quote JSX attributes, no semicolons where ASI applies, trailing commas — this is enforced by `biome format`; run `npm run format` if unsure rather than hand-matching.
- The sprite sheet asset must ship as `.webp` directly (not `.png`) so the build's `scripts/optimize-images.mjs` (which only rewrites `.png/.jpg/.jpeg` via *lossy* `sharp().webp({quality: 82})`) never touches it and degrades the pixel art.
- New component must be purely decorative: `aria-hidden="true"` on the root, no interactive semantics.
- Must respect `prefers-reduced-motion` by skipping the animation/state loop entirely (not just relying on the site's global CSS override in `src/styles.css`), per the design spec.
- Every new component in this codebase has a matching `<Name>.stories.tsx` with `tags: ['ai-generated']` (see `PowerBar.stories.tsx`, `MediaSlot.stories.tsx`).

---

## Task 1: Convert and place the sprite sheet asset

**Files:**
- Create: `public/assets/avatars/kristian-walk.webp`
- Modify: `public/assets/README.md`

**Interfaces:**
- Produces: a static asset at the site-relative path `assets/avatars/kristian-walk.webp`, referenced via the existing `assetPath()` helper (`src/routing.ts:25`) in Task 2 as `assetPath('assets/avatars/kristian-walk.webp')`.
- Known geometry (verified against the source file, do not re-derive): 1024×1024px total, 4 columns × 2 rows, 256×512px per frame. Row 0 (top half, `background-position-y: 0%`) = character facing/walking **right**. Row 1 (bottom half, `background-position-y: 100%`) = character facing/walking **left**.

- [ ] **Step 1: Convert the source PNG to a lossless WebP at the destination path**

Run:
```bash
python3 -c "
from PIL import Image
im = Image.open('/Users/kristianlentino/Downloads/kristian_walking.png').convert('RGBA')
im.save('public/assets/avatars/kristian-walk.webp', 'WEBP', lossless=True, method=6)
"
```
Expected: command exits with no output/error, and the file appears at `public/assets/avatars/kristian-walk.webp`.

- [ ] **Step 2: Verify the converted asset preserves dimensions and transparency**

Run:
```bash
python3 -c "
from PIL import Image
im = Image.open('public/assets/avatars/kristian-walk.webp').convert('RGBA')
assert im.size == (1024, 1024), im.size
assert im.getpixel((0, 0))[3] == 0, 'corner should be transparent'
print('OK', im.size)
"
```
Expected: prints `OK (1024, 1024)`. If the assertion on alpha fails, stop — do not proceed to Task 2 until the source transparency is confirmed, since the CSS design assumes a transparent background.

- [ ] **Step 3: Confirm the file size is reasonable**

Run: `ls -la public/assets/avatars/kristian-walk.webp`
Expected: a size somewhere under ~1MB (the raw PNG was ~1.6MB; lossless WebP of this art typically lands around 500-700KB). This is a sanity check, not a hard gate.

- [ ] **Step 4: Document the new asset in the assets README**

Modify `public/assets/README.md` — add a bullet after the existing `avatars/building_mode.webp` line (keep the existing lines unchanged, just insert this one):

```markdown
- `avatars/kristian-walk.webp`: walking sprite sheet for `WalkingSprite` (4x2 grid, 256x512px/frame; row 0 = facing right, row 1 = facing left). Pre-converted losslessly — do not delete/regenerate via the image pipeline.
```

- [ ] **Step 5: Confirm the build's image-optimize script leaves the new file alone**

Run: `npm run optimize:images`
Expected output includes `0 converted` (or an unrelated non-zero count only if other untouched PNGs exist elsewhere in `public/` — there should be none currently). Confirm via:
```bash
git status --porcelain public/assets/avatars/kristian-walk.webp
```
Expected: no output (file unchanged by the optimize script, since it only targets `.png/.jpg/.jpeg`).

- [ ] **Step 6: Commit**

```bash
git add public/assets/avatars/kristian-walk.webp public/assets/README.md
git commit -m "Add lossless walking sprite sheet asset"
```

---

## Task 2: `WalkingSprite` component with tests and CSS

**Files:**
- Create: `src/components/WalkingSprite.tsx`
- Create: `src/components/WalkingSprite.test.tsx`
- Modify: `src/styles.css` (append new rules; do not reformat surrounding code)

**Interfaces:**
- Consumes: `assetPath` from `src/routing.ts:25` (signature: `assetPath(path: string, base?: string): string`); the asset path `assets/avatars/kristian-walk.webp` produced by Task 1.
- Produces (for any future page-integration task): a default export `WalkingSprite` from `src/components/WalkingSprite.tsx` with:
  ```ts
  export interface WalkingSpriteProps {
    direction?: 'left' | 'right' // default 'right'
    size?: number                // default 96
    className?: string
  }
  export default function WalkingSprite(props: WalkingSpriteProps): JSX.Element
  ```
  Root element renders with `className` containing `walking-sprite`, `aria-hidden="true"`, and inline `style.height` equal to the resolved `size`.

- [ ] **Step 1: Write the failing tests**

Create `src/components/WalkingSprite.test.tsx`:

```tsx
import { render } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import WalkingSprite from './WalkingSprite'

function mockReducedMotion(matches: boolean) {
  vi.spyOn(window, 'matchMedia').mockImplementation(
    (query: string) =>
      ({
        matches,
        media: query,
        onchange: null,
        addEventListener: () => undefined,
        removeEventListener: () => undefined,
        addListener: () => undefined,
        removeListener: () => undefined,
        dispatchEvent: () => false,
      }) as MediaQueryList,
  )
}

describe('WalkingSprite', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('is purely decorative', () => {
    mockReducedMotion(false)
    const { container } = render(<WalkingSprite />)
    expect(container.querySelector('.walking-sprite')).toHaveAttribute('aria-hidden', 'true')
  })

  it('defaults to facing and walking right', () => {
    mockReducedMotion(false)
    const { container } = render(<WalkingSprite />)
    const figure = container.querySelector('.walking-sprite-figure')
    expect(figure).toHaveClass('facing-right', 'walk-right')
  })

  it('honors the direction prop', () => {
    mockReducedMotion(false)
    const { container } = render(<WalkingSprite direction="left" />)
    const figure = container.querySelector('.walking-sprite-figure')
    expect(figure).toHaveClass('facing-left', 'walk-left')
  })

  it('flips direction when the traverse animation ends', () => {
    mockReducedMotion(false)
    const { container } = render(<WalkingSprite direction="left" />)
    const before = container.querySelector('.walking-sprite-figure') as HTMLElement
    before.dispatchEvent(new Event('animationend', { bubbles: true }))
    const after = container.querySelector('.walking-sprite-figure')
    expect(after).toHaveClass('facing-right', 'walk-right')
  })

  it('applies the size prop to width and height', () => {
    mockReducedMotion(false)
    const { container } = render(<WalkingSprite size={64} />)
    const wrapper = container.querySelector('.walking-sprite') as HTMLElement
    const figure = container.querySelector('.walking-sprite-figure') as HTMLElement
    expect(wrapper.style.height).toBe('64px')
    expect(figure.style.width).toBe('32px')
    expect(figure.style.height).toBe('64px')
  })

  it('renders a static frame with no traverse class when reduced motion is preferred', () => {
    mockReducedMotion(true)
    const { container } = render(<WalkingSprite direction="left" />)
    const figure = container.querySelector('.walking-sprite-figure') as HTMLElement
    expect(figure).toHaveClass('facing-left')
    expect(figure.className).not.toMatch(/walk-(left|right)/)
  })

  it('does not change direction on animationend when reduced motion is preferred', () => {
    mockReducedMotion(true)
    const { container } = render(<WalkingSprite direction="left" />)
    const before = container.querySelector('.walking-sprite-figure') as HTMLElement
    before.dispatchEvent(new Event('animationend', { bubbles: true }))
    const after = container.querySelector('.walking-sprite-figure')
    expect(after).toHaveClass('facing-left')
  })
})
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npx vitest run src/components/WalkingSprite.test.tsx`
Expected: FAIL — `Cannot find module './WalkingSprite'` (the component doesn't exist yet).

- [ ] **Step 3: Implement the component**

Create `src/components/WalkingSprite.tsx`:

```tsx
import { useState } from 'react'
import { assetPath } from '../routing'

export interface WalkingSpriteProps {
  direction?: 'left' | 'right'
  size?: number
  className?: string
}

const SHEET_SRC = assetPath('assets/avatars/kristian-walk.webp')

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export default function WalkingSprite({
  direction = 'right',
  size = 96,
  className = '',
}: WalkingSpriteProps) {
  const [leg, setLeg] = useState<'left' | 'right'>(direction)
  const [reducedMotion] = useState(prefersReducedMotion)

  const activeDirection = reducedMotion ? direction : leg
  const figureClassName = [
    'walking-sprite-figure',
    `facing-${activeDirection}`,
    reducedMotion ? null : `walk-${activeDirection}`,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={`walking-sprite ${className}`.trim()} style={{ height: size }} aria-hidden="true">
      <div
        key={reducedMotion ? 'static' : leg}
        className={figureClassName}
        style={{ width: size / 2, height: size, backgroundImage: `url(${SHEET_SRC})` }}
        onAnimationEnd={
          reducedMotion
            ? undefined
            : () => setLeg((current) => (current === 'right' ? 'left' : 'right'))
        }
      />
    </div>
  )
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npx vitest run src/components/WalkingSprite.test.tsx`
Expected: PASS, all 7 tests green.

- [ ] **Step 5: Add the CSS**

Append to the end of `src/styles.css`:

```css
.walking-sprite {
  position: relative;
  overflow: hidden;
  width: 100%;
}

.walking-sprite-figure {
  position: absolute;
  top: 0;
  left: 0;
  background-repeat: no-repeat;
  background-size: 400% 200%;
  image-rendering: pixelated;
}

.walking-sprite-figure.facing-right {
  background-position-y: 0%;
}

.walking-sprite-figure.facing-left {
  background-position-y: 100%;
}

.walking-sprite-figure.walk-right {
  animation:
    walking-sprite-legs 0.6s steps(4) infinite,
    walking-sprite-walk-right 4s linear forwards;
}

.walking-sprite-figure.walk-left {
  animation:
    walking-sprite-legs 0.6s steps(4) infinite,
    walking-sprite-walk-left 4s linear forwards;
}

@keyframes walking-sprite-legs {
  from {
    background-position-x: 0%;
  }
  to {
    background-position-x: 100%;
  }
}

@keyframes walking-sprite-walk-right {
  from {
    left: 0%;
    transform: translateX(0%);
  }
  to {
    left: 100%;
    transform: translateX(-100%);
  }
}

@keyframes walking-sprite-walk-left {
  from {
    left: 100%;
    transform: translateX(-100%);
  }
  to {
    left: 0%;
    transform: translateX(0%);
  }
}
```

Also add a static-frame override inside the existing `@media (prefers-reduced-motion: reduce)` block (find it via `grep -n "prefers-reduced-motion" src/styles.css`, currently starting around line 2238) — insert this rule alongside the other overrides already in that block (e.g. next to `.media-slot.is-loading::after`):

```css
    .walking-sprite-figure {
      animation: none;
    }
```

- [ ] **Step 6: Run the full test suite and lint**

Run: `npm run quality && npm test -- --project '!storybook'`
Expected: both pass with no new errors.

- [ ] **Step 7: Commit**

```bash
git add src/components/WalkingSprite.tsx src/components/WalkingSprite.test.tsx src/styles.css
git commit -m "Add WalkingSprite component"
```

---

## Task 3: Storybook stories

**Files:**
- Create: `src/components/WalkingSprite.stories.tsx`

**Interfaces:**
- Consumes: `WalkingSprite` default export and `WalkingSpriteProps` from Task 2 (`src/components/WalkingSprite.tsx`).

- [ ] **Step 1: Write the story file**

Create `src/components/WalkingSprite.stories.tsx`:

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'
import WalkingSprite from './WalkingSprite'

const meta = {
  component: WalkingSprite,
  tags: ['ai-generated'],
} satisfies Meta<typeof WalkingSprite>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const sprite = canvasElement.querySelector('.walking-sprite')
    await expect(sprite).toHaveAttribute('aria-hidden', 'true')
    await expect(canvasElement.querySelector('.walking-sprite-figure')).toHaveClass('facing-right')
  },
}

export const FacingLeft: Story = {
  args: { direction: 'left' },
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelector('.walking-sprite-figure')).toHaveClass('facing-left')
  },
}

export const Large: Story = {
  args: { size: 160 },
}
```

- [ ] **Step 2: Run Storybook's test project to verify the stories pass**

Run: `npx vitest run --project storybook -t WalkingSprite`
Expected: PASS for all three stories (`Default`, `FacingLeft`, `Large`).

- [ ] **Step 3: Commit**

```bash
git add src/components/WalkingSprite.stories.tsx
git commit -m "Add WalkingSprite Storybook stories"
```

---

## Task 4: Full project verification

**Files:** none (verification only)

**Interfaces:** none — this task just confirms Tasks 1-3 integrate cleanly with the rest of the project.

- [ ] **Step 1: Run the full check script**

Run: `npm run check`
Expected: `biome check` passes, the non-storybook Vitest project passes, and `tsc -b && vite build` succeeds with no errors.

- [ ] **Step 2: Manually confirm the sprite animates in a real browser**

There is no page integration yet (out of scope per the design spec), so verify via Storybook:

Run: `npm run storybook`

Open the `WalkingSprite` story in the browser, confirm:
- The character's legs cycle through the 4-frame walk animation continuously.
- It walks from the left edge of its story canvas to the right edge, then turns around and walks back, indefinitely.
- No visible blur/artifacting on the pixel edges (confirms the lossless asset and `image-rendering: pixelated` are working).

If anything looks wrong (e.g. the "right" row is actually drawn facing left), swap the `facing-right`/`facing-left` background-position-y values in `src/styles.css` from Task 2 Step 5 and re-verify — do not touch the source image or Task 1.

- [ ] **Step 3: Commit if Step 2 required a fix**

Only if a fix was needed in Step 2:

```bash
git add src/styles.css
git commit -m "Fix WalkingSprite facing direction mapping"
```

If no fix was needed, skip this step — nothing to commit.

---

## Self-Review Notes

- **Spec coverage:** asset conversion + pipeline bypass (Task 1), component behavior including direction prop, size prop, traverse/leg animation classes, reduced-motion handling, decorative a11y (Task 2), Storybook conventions (Task 3), and a manual visual check to catch a possibly-flipped row assignment (Task 4) — all spec sections are covered.
- **Placeholder scan:** no TBD/TODO; every step has literal code or literal commands with expected output.
- **Type consistency:** `WalkingSpriteProps` (`direction`, `size`, `className`) is defined once in Task 2 Step 3 and used identically in Task 3's stories and Task 2's tests. Class names (`walking-sprite`, `walking-sprite-figure`, `facing-left/right`, `walk-left/right`) are consistent between the component, the tests, the stories, and the CSS.
