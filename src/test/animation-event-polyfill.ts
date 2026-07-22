// jsdom doesn't implement AnimationEvent. React's event-delegation code feature-detects
// `"AnimationEvent" in window` at module-load time (inside react-dom/client) to decide whether
// to register unprefixed `animationend`/`transitionend` listeners or fall back to
// vendor-prefixed ones like `webkitAnimationEnd`. Since that check runs once, as soon as
// react-dom/client is first imported anywhere in the module graph, this polyfill has to be
// its own import-free module and load (via Vitest's `setupFiles` array) before setup.ts,
// which imports `@testing-library/react` and therefore react-dom/client.
if (typeof window.AnimationEvent === 'undefined') {
  class AnimationEventPolyfill extends Event {
    animationName: string
    elapsedTime: number
    pseudoElement: string

    constructor(type: string, init: Record<string, unknown> = {}) {
      super(type, init as EventInit)
      this.animationName = (init.animationName as string) ?? ''
      this.elapsedTime = (init.elapsedTime as number) ?? 0
      this.pseudoElement = (init.pseudoElement as string) ?? ''
    }
  }

  Object.defineProperty(window, 'AnimationEvent', {
    value: AnimationEventPolyfill,
    writable: true,
  })
}
