import { act, fireEvent, render } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import WalkingSprite from './WalkingSprite'

function mockReducedMotion(matches: boolean) {
  vi.spyOn(window, 'matchMedia').mockImplementation(
    (query: string) =>
      ({
        matches,
        media: query,
        onchange: null,
        addEventListener: () => undefined,
        removeEventListener: () => undefined,
        addListener: () => undefined,
        removeListener: () => undefined,
        dispatchEvent: () => false,
      }) as MediaQueryList,
  )
}

describe('WalkingSprite', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('is purely decorative', () => {
    mockReducedMotion(false)
    const { container } = render(<WalkingSprite />)
    expect(container.querySelector('.walking-sprite')).toHaveAttribute('aria-hidden', 'true')
  })

  it('defaults to facing and walking right', () => {
    mockReducedMotion(false)
    const { container } = render(<WalkingSprite />)
    const figure = container.querySelector('.walking-sprite-figure')
    expect(figure).toHaveClass('facing-right', 'walk-right')
  })

  it('honors the direction prop', () => {
    mockReducedMotion(false)
    const { container } = render(<WalkingSprite direction="left" />)
    const figure = container.querySelector('.walking-sprite-figure')
    expect(figure).toHaveClass('facing-left', 'walk-left')
  })

  it('flips direction when the traverse animation ends', () => {
    mockReducedMotion(false)
    const { container } = render(<WalkingSprite direction="left" />)
    const before = container.querySelector('.walking-sprite-figure') as HTMLElement
    fireEvent.animationEnd(before)
    const after = container.querySelector('.walking-sprite-figure')
    expect(after).toHaveClass('facing-right', 'walk-right')
  })

  it('applies the size prop to width and height', () => {
    mockReducedMotion(false)
    const { container } = render(<WalkingSprite size={64} />)
    const wrapper = container.querySelector('.walking-sprite') as HTMLElement
    const figure = container.querySelector('.walking-sprite-figure') as HTMLElement
    expect(wrapper.style.height).toBe('64px')
    expect(figure.style.width).toBe('32px')
    expect(figure.style.height).toBe('64px')
  })

  it('renders a static frame with no traverse class when reduced motion is preferred', () => {
    mockReducedMotion(true)
    const { container } = render(<WalkingSprite direction="left" />)
    const figure = container.querySelector('.walking-sprite-figure') as HTMLElement
    expect(figure).toHaveClass('facing-left')
    expect(figure.className).not.toMatch(/walk-(left|right)/)
  })

  it('does not change direction on animationend when reduced motion is preferred', () => {
    mockReducedMotion(true)
    const { container } = render(<WalkingSprite direction="left" />)
    const before = container.querySelector('.walking-sprite-figure') as HTMLElement
    fireEvent.animationEnd(before)
    const after = container.querySelector('.walking-sprite-figure')
    expect(after).toHaveClass('facing-left')
  })

  it('cycles through the seven distinct sprite frames while moving', () => {
    vi.useFakeTimers()
    mockReducedMotion(false)
    const { container } = render(<WalkingSprite />)
    const figure = container.querySelector('.walking-sprite-figure') as HTMLElement

    expect(figure.style.backgroundPositionX).toBe('0%')

    act(() => {
      vi.advanceTimersByTime(140)
    })

    expect(figure.style.backgroundPositionX).toBe('14.285714%')

    act(() => {
      vi.advanceTimersByTime(700)
    })

    expect(figure.style.backgroundPositionX).toBe('85.714286%')

    act(() => {
      vi.advanceTimersByTime(140)
    })

    expect(figure.style.backgroundPositionX).toBe('0%')
    vi.useRealTimers()
  })
})
