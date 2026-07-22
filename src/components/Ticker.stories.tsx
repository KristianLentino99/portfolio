import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'
import Ticker from './Ticker'

const meta = {
  component: Ticker,
  tags: ['ai-generated'],
  args: {
    items: ['$ npm run world-domination', "IT'S OVER 9000", 'the answer is 42', 'λ > OOP'],
  },
} satisfies Meta<typeof Ticker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    // Ticker duplicates items for seamless scroll — use getAllByText
    const items = canvas.getAllByText(/\$ npm run/)
    await expect(items.length).toBeGreaterThanOrEqual(2)
  },
}

export const CustomSeparator: Story = {
  args: { separator: '★' },
}

export const FastScroll: Story = {
  args: { speed: 10 },
}
