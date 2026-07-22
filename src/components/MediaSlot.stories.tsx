import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'
import MediaSlot from './MediaSlot'

const meta = {
  component: MediaSlot,
  tags: ['ai-generated'],
  args: {
    src: '/assets/Kristian_Lentino.webp',
    alt: 'Portrait of Kristian Lentino',
    label: 'portrait photo',
  },
} satisfies Meta<typeof MediaSlot>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText('portrait photo')).toBeVisible()
  },
}

export const MissingImage: Story = {
  args: { src: '/assets/nonexistent.webp', label: 'missing image' },
  play: async ({ canvas }) => {
    // The label should remain visible when the image fails to load
    await expect(canvas.getByText('missing image')).toBeVisible()
  },
}

export const WithAspectRatio: Story = {
  args: { className: 'portrait-slot', label: '4:5 placeholder' },
}

export const CoverSlot: Story = {
  args: { className: 'cover-slot', label: 'cover', alt: 'Manga cover' },
}

export const Priority: Story = {
  args: { priority: true },
}

export const CssCheck: Story = {
  args: { src: '/assets/nonexistent.webp', label: 'css check', className: 'portrait-slot' },
  play: async ({ canvas }) => {
    const el = canvas.getByText('css check').closest('.media-slot') as HTMLElement
    // The media-slot should have the repeating-linear-gradient background
    await expect(getComputedStyle(el).backgroundImage).toContain('repeating-linear-gradient')
  },
}
