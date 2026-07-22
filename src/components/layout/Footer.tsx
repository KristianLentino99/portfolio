import AppLink from '../AppLink'

export interface FooterNext {
  path: string
  label: string
}

interface FooterProps {
  path: string
  onNavigate: (path: string) => void
  next?: FooterNext
}

export default function Footer({ path, onNavigate, next }: FooterProps) {
  return (
    <footer className="site-footer">
      <span>© 2026 Kristian Lentino · Italy</span>
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
