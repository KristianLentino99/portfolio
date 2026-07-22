import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn } from 'storybook/test'
import AppLink from './AppLink'

const meta = {
  component: AppLink,
  tags: ['ai-generated'],
  args: {
    to: '/about',
    navigate: fn(),
    children: 'About',
  },
} satisfies Meta<typeof AppLink>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('link', { name: 'About' })).toBeVisible()
  },
}

export const Active: Story = {
  args: { className: 'nav-link is-active', 'aria-current': 'page' },
  play: async ({ canvas }) => {
    const link = canvas.getByRole('link', { name: 'About' })
    await expect(link).toHaveAttribute('aria-current', 'page')
  },
}

export const Wordmark: Story = {
  args: {
    to: '/',
    className: 'wordmark',
    'aria-label': 'Kristian Lentino, home',
    children: (
      <>
        KL<span>.</span>
      </>
    ),
  },
}

export const FooterLink: Story = {
  args: { className: 'footer-link', children: 'Next chapter: Koomy →' },
}
