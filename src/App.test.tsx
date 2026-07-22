import { act, fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import App from './App'
import { assetPath, fromBrowserPath, toBrowserPath } from './routing'

describe('portfolio shell', () => {
  beforeEach(() => {
    window.history.replaceState({}, '', '/')
    window.localStorage.clear()
    document.documentElement.removeAttribute('data-theme')
    window.matchMedia = (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
      addListener: () => undefined,
      removeListener: () => undefined,
      dispatchEvent: () => false,
    })
  })

  it('renders the founder positioning and primary navigation', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1, name: /engineering rigor/i })).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: /primary/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /the koomy story/i })).toHaveAttribute('href', '/koomy')
  })

  it('points the hero thought balloon toward the portrait subject', () => {
    render(<App />)
    expect(screen.getByText('What should we build next?').closest('aside')).toHaveClass('comic-balloon--tail-bottom-left')
  })

  it('navigates between portfolio routes without a full reload', () => {
    render(<App />)
    fireEvent.click(screen.getByRole('link', { name: 'About' }))
    expect(screen.getByRole('heading', { level: 1, name: /everything changed/i })).toBeInTheDocument()
    expect(window.location.pathname).toBe('/about')
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('aria-current', 'page')
  })

  it('closes the navigation menu with Escape', () => {
    render(<App />)
    const menuButton = screen.getByRole('button', { name: /open menu/i })
    fireEvent.click(menuButton)
    expect(menuButton).toHaveAttribute('aria-expanded', 'true')
    fireEvent.keyDown(window, { key: 'Escape' })
    expect(menuButton).toHaveAttribute('aria-expanded', 'false')
  })

  it('persists and exposes the selected theme', () => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: /switch to dark theme/i }))
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark')
    expect(window.localStorage.getItem('kl-theme')).toBe('dark')
  })

  it('uses the system color scheme when no theme has been selected', () => {
    window.matchMedia = (query: string) => ({
      matches: query === '(prefers-color-scheme: dark)',
      media: query,
      onchange: null,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
      addListener: () => undefined,
      removeListener: () => undefined,
      dispatchEvent: () => false,
    })

    render(<App />)
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark')
    expect(screen.getByRole('button', { name: /switch to light theme/i })).toBeInTheDocument()
  })

  it('responds to system color-scheme changes until the user chooses a theme', () => {
    let onColorSchemeChange: ((event: MediaQueryListEvent) => void) | undefined
    window.matchMedia = (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: (_event: string, listener: EventListenerOrEventListenerObject) => {
        onColorSchemeChange = listener as (event: MediaQueryListEvent) => void
      },
      removeEventListener: () => undefined,
      addListener: () => undefined,
      removeListener: () => undefined,
      dispatchEvent: () => false,
    })

    render(<App />)
    expect(document.documentElement).toHaveAttribute('data-theme', 'light')
    act(() => onColorSchemeChange?.({ matches: true } as MediaQueryListEvent))
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark')
  })

  it('keeps an explicit theme choice over the system preference', () => {
    window.localStorage.setItem('kl-theme', 'light')
    window.matchMedia = (query: string) => ({
      matches: query === '(prefers-color-scheme: dark)',
      media: query,
      onchange: null,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
      addListener: () => undefined,
      removeListener: () => undefined,
      dispatchEvent: () => false,
    })

    render(<App />)
    expect(document.documentElement).toHaveAttribute('data-theme', 'light')
  })

  it('connects the Koomy product story to its reader-first origin', () => {
    window.history.replaceState({}, '', '/koomy')
    render(<App />)
    expect(screen.getByRole('img', { name: 'Koomy' })).toHaveAttribute('src', '/assets/koomy-logo.webp')
    expect(screen.getByRole('img', { name: /koomy app home screen/i })).toHaveAttribute('src', '/assets/koomy-reader.webp')
    expect(screen.getByText('The Burger King question')).toBeInTheDocument()
    expect(screen.getByText(/10% free preview/i)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /not replacing paper/i })).toBeInTheDocument()
  })

  it('frames the timeline thesis as the throughline into the career arcs', () => {
    window.history.replaceState({}, '', '/timeline')
    render(<App />)
    expect(screen.getByRole('complementary', { name: /the throughline/i })).toHaveTextContent(/founder mindset connected them/i)
    expect(screen.getByRole('region', { name: /career timeline/i })).toHaveClass('is-tracing')
    expect(screen.getAllByTestId('timeline-segment')).toHaveLength(5)
    expect(screen.getByTestId('current-timeline-dot')).toHaveClass('current-dot')
    expect(screen.getByRole('heading', { name: /koomy is born/i })).toBeInTheDocument()
  })

  it('offers Telegram as a direct contact channel', () => {
    window.history.replaceState({}, '', '/contact')
    render(<App />)
    expect(screen.getByRole('link', { name: /telegram klentino99/i })).toHaveAttribute('href', 'https://t.me/KLENTINO99')
  })
})

describe('deployment paths', () => {
  it('maps application routes and assets under the GitHub Pages base path', () => {
    expect(toBrowserPath('/timeline', '/portfolio/')).toBe('/portfolio/timeline')
    expect(toBrowserPath('/', '/portfolio/')).toBe('/portfolio/')
    expect(fromBrowserPath('/portfolio/timeline', '/portfolio/')).toBe('/timeline')
    expect(assetPath('assets/koomy-logo.webp', '/portfolio/')).toBe('/portfolio/assets/koomy-logo.webp')
  })
})
