import { useEffect, useRef, useState } from 'react'

const SUDO_SEQUENCE = ['s', 'u', 'd', 'o']

export default function useSudoSequence(): boolean {
  const [active, setActive] = useState(false)
  const sequenceIndex = useRef(0)

  useEffect(() => {
    let timeout: number | undefined
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target
      if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        (target instanceof HTMLElement && target.isContentEditable)
      ) {
        return
      }

      sequenceIndex.current =
        event.key === SUDO_SEQUENCE[sequenceIndex.current]
          ? sequenceIndex.current + 1
          : event.key === SUDO_SEQUENCE[0]
            ? 1
            : 0

      if (sequenceIndex.current === SUDO_SEQUENCE.length) {
        sequenceIndex.current = 0
        setActive(true)
        window.clearTimeout(timeout)
        timeout = window.setTimeout(() => setActive(false), 4800)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.clearTimeout(timeout)
    }
  }, [])

  return active
}
