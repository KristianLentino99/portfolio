import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, waitFor } from 'storybook/test'
import MediaSlot from './MediaSlot'

const meta = {
  component: MediaSlot,
  tags: ['ai-generated'],
  args: {
    src: '/assets/Kristian_Lentino.webp',
    alt: 'Portrait of Kristian Lentino',
  },
} satisfies Meta<typeof MediaSlot>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Loading…')).toBeVisible()
  },
}

export const MissingImage: Story = {
  args: { src: '/assets/nonexistent.webp' },
  play: async ({ canvas }) => {
    await waitFor(() => expect(canvas.getByText('Image failed to load')).toBeVisible())
  },
}

export const WithAspectRatio: Story = {
  args: { className: 'portrait-slot' },
}

export const CoverSlot: Story = {
  args: { className: 'cover-slot', alt: 'Manga cover' },
}

export const Priority: Story = {
  args: { priority: true },
}

export const CssCheck: Story = {
  args: { src: '/assets/nonexistent.webp', className: 'portrait-slot' },
  play: async ({ canvas }) => {
    await waitFor(() => {
      const el = canvas.getByText('Image failed to load').closest('.media-slot') as HTMLElement
      expect(getComputedStyle(el).backgroundImage).toContain('repeating-linear-gradient')
    })
  },
}
