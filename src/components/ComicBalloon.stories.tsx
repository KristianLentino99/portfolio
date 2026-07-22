import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'
import ComicBalloon from './ComicBalloon'

const meta = {
  component: ComicBalloon,
  tags: ['ai-generated'],
  args: {
    children: 'What should we build next?',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['speech', 'shout', 'thought', 'whisper', 'narration'],
    },
    tone: {
      control: 'select',
      options: ['surface', 'orange', 'ink'],
    },
    tail: {
      control: 'select',
      options: ['none', 'top-left', 'top-right', 'bottom-left', 'bottom-right'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof ComicBalloon>

export default meta
type Story = StoryObj<typeof meta>

// ── Variant gallery ──────────────────────────────────────────────

export const Speech: Story = {
  args: { variant: 'speech', tail: 'bottom-left', children: 'I build software with engineering rigor.' },
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/engineering rigor/)).toBeVisible()
  },
}

export const Shout: Story = {
  args: { variant: 'shout', tone: 'orange', children: 'First episode FREE!!!' },
}

export const Thought: Story = {
  args: { variant: 'thought', tail: 'bottom-left', children: 'What should we build next?' },
}

export const Whisper: Story = {
  args: { variant: 'whisper', tail: 'bottom-right', children: 'Psst… email is the fastest route.' },
}

export const Narration: Story = {
  args: { variant: 'narration', tone: 'orange', children: 'Every arc added a new skill. The founder mindset connected them.' },
}

// ── Tone variants ─────────────────────────────────────────────────

export const OrangeTone: Story = {
  args: { variant: 'speech', tone: 'orange', tail: 'bottom-left', children: 'Koomy orange!' },
}

export const InkTone: Story = {
  args: { variant: 'speech', tone: 'ink', tail: 'bottom-left', children: 'Dark mode ready.' },
  parameters: { backgrounds: { default: 'dark' } },
}

// ── Tail directions ───────────────────────────────────────────────

export const TailTopLeft: Story = {
  args: { variant: 'speech', tail: 'top-left', children: 'Tail top-left.' },
}

export const TailTopRight: Story = {
  args: { variant: 'speech', tail: 'top-right', children: 'Tail top-right.' },
}

export const TailNone: Story = {
  args: { variant: 'narration', tail: 'none', children: 'No tail — narration style.' },
}

// ── Sizes ─────────────────────────────────────────────────────────

export const Small: Story = {
  args: { size: 'sm', children: 'Tiny bubble.' },
}

export const Large: Story = {
  args: { size: 'lg', children: 'Big bold statement bubble.' },
}

// ── CssCheck — proves global CSS loaded ───────────────────────────

export const CssCheck: Story = {
  args: { variant: 'speech', tone: 'orange', children: 'CSS check' },
  play: async ({ canvas }) => {
    const el = canvas.getByText('CSS check').closest('.comic-balloon') as HTMLElement
    // --orange = oklch(77.6% .174 61.8) — browser reports OKLCH when supported
    await expect(getComputedStyle(el).backgroundColor).toBe('oklch(0.776 0.174 61.8)')
  },
}
