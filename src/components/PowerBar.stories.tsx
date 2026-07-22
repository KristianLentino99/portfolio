import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'
import PowerBar from './PowerBar'

const meta = {
  component: PowerBar,
  tags: ['ai-generated'],
  args: {
    value: 68,
  },
} satisfies Meta<typeof PowerBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    const bar = canvas.getByRole('progressbar')
    await expect(bar).toHaveAttribute('aria-valuenow', '68')
    await expect(bar).toBeVisible()
  },
}

export const Full: Story = {
  args: { value: 100 },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100')
  },
}

export const Empty: Story = {
  args: { value: 0 },
}

export const Over100: Story = {
  args: { value: 150 },
  play: async ({ canvas }) => {
    // Clamped to 100
    await expect(canvas.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100')
  },
}

export const XPBar: Story = {
  args: { value: 68, className: 'xp-bar' },
}
