import type { RoutePath } from '../../routing'
import AppLink from '../AppLink'
import LinkedInLink from '../social/LinkedInLink'
import WalkingSprite from '../WalkingSprite'

export interface FooterNext {
  path: RoutePath
  label: string
}

interface FooterProps {
  path: RoutePath
  onNavigate: (path: RoutePath) => void
  next?: FooterNext
}

export default function Footer({ path, onNavigate, next }: FooterProps) {
  return (
    <footer className="site-footer">
      
      <div className="footer-left">
        <div className="footer-sprite">
        <WalkingSprite size={80} />
      </div>
        <span>© 2026 Kristian Lentino · Italy</span>
        <LinkedInLink className="footer-social-link" showLabel={false} iconSize={16} />
      </div>
      {next ? (
        <AppLink to={next.path} navigate={onNavigate} className="footer-link">
          {next.label}
        </AppLink>
      ) : path === '/' ? (
        <span className="sudo-hint">psst... try typing "sudo"</span>
      ) : (
        <span className="continued">TO BE CONTINUED…</span>
      )}
    </footer>
  )
}
