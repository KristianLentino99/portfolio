import { createPortal } from 'react-dom'

interface SudoOverlayProps {
  active: boolean
}

export default function SudoOverlay({ active }: SudoOverlayProps) {
  if (!active) return null

  return createPortal(
    <div className="sudo-mode" role="status" aria-label="sudo mode activated">
      <div className="sudo-scanlines" aria-hidden="true" />
      <div className="sudo-terminal">
        <p className="sudo-line sudo-line-1">
          <span className="sudo-prompt">$</span> sudo activate
        </p>
        <p className="sudo-line sudo-line-2">
          [sudo] password for kristian: <span className="sudo-asterisk">••••••••</span>
        </p>
        <p className="sudo-line sudo-line-3">
          <span className="sudo-ok">✓</span> root access granted.
        </p>
        <p className="sudo-line sudo-line-4">&nbsp;</p>
        <p className="sudo-line sudo-line-5">kernel: Kristian_Lentino/v42.0</p>
        <p className="sudo-line sudo-line-6">power_level: IT'S OVER 9000</p>
        <p className="sudo-line sudo-line-7">
          λ-calculus engine: <span className="sudo-ok">ONLINE</span>
        </p>
        <p className="sudo-line sudo-line-8">
          founder mode: <span className="sudo-ok">ENABLED</span>
        </p>
        <p className="sudo-line sudo-line-9">&nbsp;</p>
        <p className="sudo-line sudo-line-10">
          <span className="sudo-prompt">$</span> chmod 777 reality
        </p>
        <p className="sudo-line sudo-line-11">chmod: reality: Read-only file system</p>
        <p className="sudo-line sudo-line-12">&nbsp;</p>
        <p className="sudo-line sudo-line-13">
          <span className="sudo-prompt">$</span> npm run world-domination
        </p>
        <p className="sudo-line sudo-line-14">
          <span className="sudo-ok">✓</span> Build succeeded.
        </p>
        <p className="sudo-line sudo-line-15">
          <span className="sudo-prompt">$</span> <span className="sudo-cursor">█</span>
        </p>
      </div>
    </div>,
    document.body,
  )
}
