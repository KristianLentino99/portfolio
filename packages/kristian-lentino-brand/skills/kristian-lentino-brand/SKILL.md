---
name: kristian-lentino-brand
description: Apply Kristian Lentino's personal brand system — tone of voice, color palette, typography, design tokens, and component patterns — to any content, copy, UI, or communication. Use when writing as Kristian, building or styling his portfolio/design system, creating content for kristianlentino.it, or any task where his founder brand voice and visual identity must be preserved. Triggers on "Kristian Lentino brand", "my personal brand", "kristianlentino.it", "match my portfolio style", "KL brand", or any copy/UI work for his projects.
---

# Kristian Lentino Brand System

The complete personal brand system for Kristian Lentino — engineer-founder, AI agent builder at commercetools, and co-founder of Koomy. Derived from the kristianlentino.it portfolio design system.

## Quick Reference Card

| Aspect             | Value                                                                                                             |
| ------------------ | ----------------------------------------------------------------------------------------------------------------- |
| **Tone**           | Confident first-person founder-speak, nerdy with selective manga references, grounded claims with irreverence     |
| **Emotion**        | Confidence first → curiosity → delight                                                                            |
| **Primary orange** | `#fe9a2e` / `oklch(77.6% .174 61.8)`                                                                              |
| **Body font**      | Space Grotesk (400, 500, 700)                                                                                     |
| **Display font**   | Bangers (for stickers, labels, comic energy)                                                                      |
| **Mono font**      | System monospace stack (data, tickers, labels)                                                                    |
| **One-liner**      | "I build software with engineering rigor and shonen energy."                                                      |
| **Anti-patterns**  | Corporate generic, recruiter-template minimalism, SaaS gradients, glassmorphism, decorative manga without purpose |

## Tone of Voice

### Core Rules

1. **First-person founder-speak.** Write as Kristian. Use "I" and "we" (for Koomy). No corporate third-person.
2. **Confidence with receipts.** Every claim is grounded in a real role, product, metric, or milestone. No fluff.
3. **Nerdy is the default.** Manga/anime references are welcome but must serve the point — seasoning, not cosplay. Examples: "shonen energy," "arc," "saga," "level up," "special moves."
4. **A little irreverence.** Terminal humor, Konami codes, "it's over 9000" — but never at the expense of credibility.
5. **Short sentences. Punchy verbs.** Ship. Build. Bootstrap. Launch. Grind. No passive voice.
6. **Italian pride without cliché.** "Chignolo Po → the world" works. Olive-green-flag-waving does not.
7. **No AI-speak.** Never: "delve," "unlock potential," "in today's landscape," "game-changer," "revolutionize." If it sounds like a LinkedIn thought leader wrote it, delete it.

### Before/After Examples

| ❌ Don't                                                     | ✅ Do                                                                      |
| ------------------------------------------------------------ | -------------------------------------------------------------------------- |
| "Kristian is a passionate engineer with deep expertise"      | "I build software with engineering rigor and shonen energy."               |
| "Leveraging cutting-edge AI to drive digital transformation" | "Building frontier AI agents that automate intake flows."                  |
| "A comprehensive platform for digital comics consumption"    | "Italy's home for official digital comics. Read on any screen."            |
| "He has extensive experience in the fintech space"           | "Joined a fintech I already used and loved. Helped build Share Investing." |

### Energy Calibration

- **Home/Hero**: Bold, direct, hook in first 4 words. "I build software with engineering rigor..."
- **About**: Conversational founder story. Origin narrative with humility. "I hated informatics class. Then I coded a videogame..."
- **Koomy**: Proud builder, reader-turned-founder. Metrics-forward. "10k+ readers, bootstrapped from zero."
- **Timeline**: Saga storyteller. Each job/era is an "arc." Career as coherent narrative.
- **Contact**: Warm, approachable, a wink. "Why the Marineford arc still hits different."

## Color System

### Theme Tokens

All tokens use OKLCH with hex fallbacks for broad browser support.

#### Light (default)

```
--orange:       #fe9a2e / oklch(77.6% .174 61.8)
--orange-soft:  #ffb45e / oklch(83.5% .137 66.3)
--orange-deep:  #a95400 / oklch(49% .145 57)
--bg:           #faf8f4 / oklch(98.1% .008 73)    (warm off-white page)
--fg:           #141210 / oklch(18.8% .011 64)    (warm near-black ink)
--card:         #ffffff / oklch(100% 0 0)
--cardline:     #141210                              (card borders)
--line:         rgb(20 18 16 / 11%)                  (hairline dividers)
--muted:        rgb(20 18 16 / 75%)                  (secondary text)
--muted-2:      rgb(20 18 16 / 65%)                  (tertiary text)
--stripe-1:     #efe9df                              (placeholder stripes)
--stripe-2:     #f6f2ea
--label:        var(--orange-deep)                   (accent text)
--button-bg:    #141210
--button-fg:    #ffffff
--focus:        #006bd6 / oklch(53% .21 255)
```

#### Dark (`[data-theme='dark']`)

```
--bg:           #151210 / oklch(18.8% .011 64)
--fg:           #faf8f4 / oklch(98.1% .008 73)
--card:         #1e1a16 / oklch(23.2% .016 61)
--cardline:     rgb(250 248 244 / 26%)
--line:         rgb(250 248 244 / 13%)
--muted:        rgb(250 248 244 / 76%)
--muted-2:      rgb(250 248 244 / 67%)
--stripe-1:     #221d18
--stripe-2:     #2a241e
--label:        var(--orange-soft)
--button-bg:    var(--orange)
--button-fg:    #151210
--focus:        #71b7ff
```

### Usage Rules

- **Orange is the only accent hue.** Never introduce blue, green, purple, or any second accent.
- **Orange on light**: use `--orange-deep` (`#a95400`) for text on light surfaces to meet AA contrast.
- **Orange on dark**: `--orange` and `--orange-soft` work directly; `--orange-deep` is too dark.
- **Featured panels**: invert — orange background, `#141210` text, 4px offset shadow.
- **Never use pure black** (`#000`) or pure white (`#fff`) — always the warm near-black/white tokens.

## Typography

### Font Stack

```css
/* Body + editorial */
font-family: "Space Grotesk", system-ui, sans-serif;

/* Comic energy (stickers, labels, Bangers display) */
font-family: "Bangers", cursive;

/* Data, tickers, code-like labels */
font-family: ui-monospace, Menlo, monospace;
```

### Type Scale

| Role             | Font          | Weight | Notes                                                                |
| ---------------- | ------------- | ------ | -------------------------------------------------------------------- |
| Hero headings    | Space Grotesk | 700    | `clamp(42px, 4vw, 56px)`, line-height 1.04, letter-spacing ≥ -0.03em |
| Page headings    | Space Grotesk | 700    | `clamp(40px, 4vw, 52px)`, line-height 1.05                           |
| Section headings | Space Grotesk | 700    | `clamp(30px, 3vw, 40px)`                                             |
| Body copy        | Space Grotesk | 400    | 15.5–18px, line-height 1.65–1.72, max 65–75 chars/line               |
| Lead paragraphs  | Space Grotesk | 400    | 16.5–18px, `--muted` color                                           |
| Eyebrows/kickers | Space Grotesk | 700    | 13px, letter-spacing 0.12em, `--label` color                         |
| Stickers         | Bangers       | 400    | Variable sizes, letter-spacing 0.04em                                |
| Display name     | Bangers       | 400    | ~44px, letter-spacing 0.03em                                         |
| Data labels      | Monospace     | 700    | 11–13px, letter-spacing 0.05–0.08em                                  |
| Ticker           | Monospace     | 700    | 12px                                                                 |
| Nav links        | Space Grotesk | 600    | 13px                                                                 |

### Bangers Usage

- Character display names
- Arc tags (ARC 1 · FIRST QUEST)
- Section kickers inside comic panels
- Narration balloons
- Stat labels in RPG panels
- Gear badges
- Never use Bangers for body text or professional claims

## Layout System

### Spacing

```
--page-gutter:  48px (desktop) / 28px (tablet) / 20px (mobile)
--container:    1200px max-width
```

### Grid Patterns

- **Two-column hero**: 1.4fr / 1fr → collapses to single column
- **Four-column metrics**: collapses 4→2→1
- **Five-column arc strip**: horizontal scroller on tablet
- **Three-column grid** (shelf, contact): collapses to 1 column
- **Timeline**: 120px year / 40px track / 1fr card

### Component Borders & Corners

- **Cards**: 2px solid `--cardline`, 10px border-radius
- **Buttons**: 6px border-radius
- **Featured panels**: 2px border + `4px 4px 0` offset shadow in `--cardline`
- **Comic balloons**: variable per variant (see COMPONENTS.md)
- **Pills/bars**: 100px border-radius

### Responsive Breakpoints

```
> 980px: Full desktop layout
760–980px: Tablet (reduced gutters, collapsed grids)
520–760px: Mobile (single column, full-width buttons)
< 520px: Small mobile (reduced padding, stacked everything)
```

## Component Vocabulary

Reference the portfolio's component patterns:

| Component        | Purpose                  | Key traits                                              |
| ---------------- | ------------------------ | ------------------------------------------------------- |
| **Wordmark**     | "KL." logo               | Space Grotesk 700, 36px, orange dot                     |
| **Header**       | KL + nav + theme toggle  | Sticky, hairline bottom border                          |
| **Footer**       | Copyright + next chapter | "TO BE CONTINUED…" in Bangers                           |
| **Button**       | Primary/secondary CTAs   | 6px radius, 45px min-height, hover lift                 |
| **MediaSlot**    | Image placeholder system | Striped pattern, stable aspect ratio                    |
| **Sticker**      | Orange comic labels      | Bangers, slight rotation, orange glow shadow            |
| **ComicBalloon** | Semantic callouts        | 5 variants: speech, shout, thought, whisper, narration  |
| **Panel/Card**   | Content containers       | 2px border, 10px radius, optional orange featured state |
| **PowerBar**     | RPG-style stat bars      | Orange striped fill, pill shape, grow animation         |
| **Ticker**       | Scrolling terminal tape  | Monospace, orange bg, continuous animation              |
| **Timeline**     | Career arc visualization | Vertical track with dots, year + card layout            |

### ComicBalloon Variants

```
speech    → rounded rectangle, solid border, tail triangle
shout     → jagged clip-path polygon, drop shadow, Bangers font
thought   → circular, bubble-tail dots
whisper   → dashed border, italic, subtle
narration → sharp corners, Bangers font, rectangular
```

Tones: `surface` (card bg), `orange` (brand), `ink` (inverted fg/bg)
Tails: `none`, `top-left`, `top-right`, `bottom-left`, `bottom-right`
Sizes: `sm` (12.5px), `md` (14px), `lg` (16px)

Limit to 1–2 balloons per viewport — comic energy is seasoning.

## Motion

- Page entrance: `page-in` animation (fade + translateY 8px, 0.55s ease-out)
- Ticker: 30s linear infinite scroll (disabled in reduced-motion)
- Power bars: `scaleX(0) → scaleX(1)` grow, 1.4s ease-out
- Stat counters: easeOutCubic tween over 1.5s
- Floating badges: 3.2s ease-in-out infinite translateY(-7px)
- **Reduced motion**: All animations → 0.01ms duration. Ticker stops. Instant counts.

## Accessibility (WCAG 2.2 AA)

- All interactive elements have visible `:focus-visible` outlines (3px `--focus`, 3px offset)
- Skip-to-content link
- Semantic landmarks (`<header>`, `<nav>`, `<main>`, `<footer>`)
- Theme toggle respects `prefers-color-scheme` and persists to localStorage
- Screen-reader labels on all icon-only controls
- `prefers-reduced-motion: reduce` kills all decorative motion
- AA contrast in both themes

## Applying the Brand

### When Writing Copy

1. Read the relevant section under "Energy Calibration"
2. Check against "Before/After Examples"
3. Scan for AI-speak red flags
4. Add ONE manga/anime reference max per section
5. Read aloud — does it sound like a real founder talking?

### When Building UI

1. Start from `design-tokens.css` (see TOKENS.md)
2. Orange is the only accent. No exceptions.
3. Light mode first, dark as a theme variant
4. Comic elements (Bangers, balloons, stickers) are seasoning — one or two per viewport
5. Everything gets a `transition: background-color .3s, color .3s, border-color .3s`

### When Designing New Components

1. Follow the border-radius rules (6px buttons, 10px cards, 100px pills)
2. Use the 2px border convention
3. Featured state = orange bg + `#141210` text + 4px offset shadow
4. Respect the type scale — no ad-hoc font sizes
5. Test both themes and reduced motion
