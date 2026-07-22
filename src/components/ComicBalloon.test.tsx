import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import ComicBalloon from './ComicBalloon'

describe('ComicBalloon', () => {
  it.each(['speech', 'shout', 'thought', 'whisper', 'narration'] as const)(
    'renders the %s variant',
    (variant) => {
      render(<ComicBalloon variant={variant}>{variant} message</ComicBalloon>)
      expect(screen.getByText(`${variant} message`).closest('.comic-balloon')).toHaveClass(
        `comic-balloon--${variant}`,
      )
    },
  )

  it('combines tone, size, and tail without changing its note semantics', () => {
    render(
      <ComicBalloon variant="speech" tone="orange" size="lg" tail="top-right">
        A focused message
      </ComicBalloon>,
    )
    const balloon = screen.getByRole('note')
    expect(balloon).toHaveClass(
      'comic-balloon--orange',
      'comic-balloon--lg',
      'comic-balloon--tail-top-right',
    )
  })

  it('can remove the tail for rectangular narration', () => {
    render(
      <ComicBalloon variant="narration" tail="none">
        Previously in this saga
      </ComicBalloon>,
    )
    expect(screen.getByRole('note')).toHaveClass('comic-balloon--tail-none')
  })
})
