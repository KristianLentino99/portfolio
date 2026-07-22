import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'
import Sticker from './Sticker'

const meta = {
  component: Sticker,
  tags: ['ai-generated'],
  args: {
    children: 'Test',
  },
} satisfies Meta<typeof Sticker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Test')).toBeVisible()
  },
}

export const Rotated: Story = {
  args: { className: 'founder-sticker', children: 'New!' },
}
