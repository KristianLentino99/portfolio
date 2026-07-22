import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'
import Button from './Button'

const meta = {
  component: Button,
  tags: ['ai-generated'],
  args: {
    children: 'Click me',
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// ── Primary variant ──────────────────────────────────────────────

export const Primary: Story = {
  play: async ({ canvas }) => {
    const btn = canvas.getByRole('button', { name: 'Click me' })
    await expect(btn).toBeVisible()
    await expect(btn).toHaveClass('button-primary')
  },
}

export const PrimaryAsLink: Story = {
  args: { href: 'https://koomy.it', target: '_blank', children: 'Visit Koomy' },
  play: async ({ canvas }) => {
    const link = canvas.getByRole('link', { name: 'Visit Koomy' })
    await expect(link).toHaveAttribute('href', 'https://koomy.it')
    await expect(link).toHaveAttribute('target', '_blank')
  },
}

// ── Secondary variant ────────────────────────────────────────────

export const Secondary: Story = {
  args: { variant: 'secondary', children: 'Cancel' },
  play: async ({ canvas }) => {
    const btn = canvas.getByRole('button', { name: 'Cancel' })
    await expect(btn).toHaveClass('button-secondary')
  },
}

export const SecondaryAsLink: Story = {
  args: { variant: 'secondary', href: '/contact', children: 'Get in touch' },
}

// ── CssCheck — proves global CSS loaded ──────────────────────────

export const CssCheck: Story = {
  args: { children: 'Submit' },
  play: async ({ canvas }) => {
    const btn = canvas.getByRole('button', { name: 'Submit' })
    // --button-bg in light mode = #141210 → rgb(20, 18, 16) or oklch
    const bg = getComputedStyle(btn).backgroundColor
    // Either hex or oklch depending on browser support
    const isDark = bg === 'rgb(20, 18, 16)' || bg === 'oklch(0.188 0.011 64)'
    await expect(isDark).toBe(true)
  },
}
