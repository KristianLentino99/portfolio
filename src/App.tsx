import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import AppLink from './components/AppLink'
import Button from './components/Button'
import CharacterPanel from './components/CharacterPanel'
import ComicBalloon from './components/ComicBalloon'
import MediaSlot from './components/MediaSlot'
import Sticker from './components/Sticker'
import Ticker from './components/Ticker'
import PageShell from './components/layout/PageShell'
import { assetPath, fromBrowserPath, toBrowserPath, type RoutePath } from './routing'

type Theme = 'light' | 'dark'

const NAV_ITEMS: Array<{ path: RoutePath; label: string }> = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/koomy', label: 'Koomy' },
  { path: '/timeline', label: 'Timeline' },
  { path: '/contact', label: 'Contact' },
]

const PAGE_TITLES: Record<RoutePath, string> = {
  '/': 'Kristian Lentino · Engineer & Founder',
  '/about': 'About · Kristian Lentino',
  '/koomy': 'Koomy · Kristian Lentino',
  '/timeline': 'Timeline · Kristian Lentino',
  '/contact': 'Contact · Kristian Lentino',
}

function useRoute() {
  const [path, setPath] = useState<RoutePath>(() => fromBrowserPath(window.location.pathname))

  useEffect(() => {
    const onPopState = () => setPath(fromBrowserPath(window.location.pathname))
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const navigate = (nextPath: string) => {
    if (nextPath !== path) window.history.pushState({}, '', toBrowserPath(nextPath))
    setPath(fromBrowserPath(nextPath, '/'))
    window.scrollTo({ top: 0, behavior: 'instant' })
    window.setTimeout(() => document.getElementById('main-content')?.focus({ preventScroll: true }), 0)
  }

  return { path, navigate }
}

function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = window.localStorage.getItem('kl-theme')
    if (saved === 'dark' || saved === 'light') return saved
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    const colorScheme = window.matchMedia('(prefers-color-scheme: dark)')
    const followSystemTheme = (event: MediaQueryListEvent) => {
      const saved = window.localStorage.getItem('kl-theme')
      if (saved !== 'dark' && saved !== 'light') {
        setTheme(event.matches ? 'dark' : 'light')
      }
    }

    colorScheme.addEventListener('change', followSystemTheme)
    return () => colorScheme.removeEventListener('change', followSystemTheme)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#151210' : '#faf8f4')
  }, [theme])

  const toggle = () => {
    setTheme((current) => {
      const next = current === 'dark' ? 'light' : 'dark'
      window.localStorage.setItem('kl-theme', next)
      return next
    })
  }

  return { theme, toggle }
}



const sagaArcs = [
  { arc: 'ARC 1 · 2019', title: 'First Quest', body: 'Zucchetti → Dieffetech. Full-stack, where the journey started.' },
  { arc: 'ARC 2 · 2022', title: 'Fintech Saga', body: 'Worked in Moneyfarm, leading digital asset management platform bringing Share Investing to our customers.' },
  { arc: 'ARC 3 · 2023', title: 'Koomy is born', body: "Co-founded Italy's digital comics platform.", featured: true },
  { arc: 'ARC 4 · 2024', title: 'Tokyo Chapter', body: 'Spoke at Scala Matsuri and later joined Commercetools as BE Engineer.' },
  { arc: 'ARC 5 · NOW', title: 'Agent Era', body: 'Frontier AI agents by day, Koomy growth by night.' },
]

function HomePage({ navigate }: { navigate: (path: string) => void }) {
  const [sudoMode, setSudoMode] = useState(false)
  const sequenceRef = useRef(0)

  useEffect(() => {
    const sequence = ['s', 'u', 'd', 'o']
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement || (event.target as HTMLElement)?.isContentEditable) return
      sequenceRef.current = event.key === sequence[sequenceRef.current] ? sequenceRef.current + 1 : event.key === sequence[0] ? 1 : 0
      if (sequenceRef.current === sequence.length) {
        sequenceRef.current = 0
        setSudoMode(true)
        window.setTimeout(() => setSudoMode(false), 4800)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const tickerItems = ['$ npm run world-domination', "IT'S OVER 9000", 'the answer is 42', 'λ > OOP', 'nakama > everything', 'git commit -m "ship it"', 'do a barrel roll', 'sudo make me a founder', 'One Piece > sleep', 'console.log("gm")']

  return (
    <>
      <section className="hero home-hero">
        <div className="hero-copy">
          <p className="eyebrow">ENGINEER · FOUNDER</p>
          <h1>I build software with engineering rigor <span className="dash">-</span><br /><span className="accent">and shonen energy.</span></h1>
          <p className="lead">Hey there, I'm Kristian 👋🏻. <br/>I love to build things and right now I'm working on <b>AI agents</b> at commercetools and I'm the co-founder of <b>Koomy: the Italy's digital comics platform </b>. As you can guess I'm a big comics and manga fan.</p>
          <div className="button-row">
            <AppLink to="/koomy" navigate={navigate} className="button button-primary">The Koomy story →</AppLink>
            <AppLink to="/contact" navigate={navigate} className="button button-secondary">Get in touch</AppLink>
          </div>
        </div>
        <div className="hero-media">
          <MediaSlot src={assetPath('assets/Kristian_Lentino.webp')} alt="Portrait of Kristian Lentino" label="portrait photo" className="portrait-slot" priority />
          <ComicBalloon variant="thought" tail="bottom-left" size="sm" className="home-thought">What should we build next?</ComicBalloon>
          <Sticker className="founder-sticker">Founder mode: ON</Sticker>
        </div>
      </section>
      <Ticker items={tickerItems} />
      <div className="character-band">
        <div className="container"><CharacterPanel />
          <aside className="now-panel" aria-label="What Kristian is doing right now">
            <h2>MEANWHILE, RIGHT NOW…</h2>
            <div className="now-grid">
              <div><strong>READING</strong><span>One Piece, the ritual since forever.</span></div>
              <div><strong>BUILDING</strong><span>Koomy with the ambition to bring digital comics to every reader in Italy.</span></div>
              <div><strong>TRAINING</strong><span>Frontier AI agents at commercetools leveraging on LLM to automate and cut costs for our customers.</span></div>
              <div><strong>LAST SEEN</strong><span>On stage at Scala Matsuri in Tokyo talking about Scala in the homeland of manga.</span></div>
            </div>
          </aside>
        </div>
      </div>
      <section className="saga-section container" aria-labelledby="saga-title">
        <div className="section-heading-row"><h2 id="saga-title" className="narration-label">PREVIOUSLY, IN THIS SAGA…</h2><AppLink to="/timeline" navigate={navigate} className="text-link">Full timeline →</AppLink></div>
        <div className="arc-strip">
          {sagaArcs.map((arc) => <article key={arc.arc} className={arc.featured ? 'arc-card featured-panel' : 'arc-card'}><span>{arc.arc}</span><h3>{arc.title}</h3><p>{arc.body}</p></article>)}
        </div>
      </section>
      {sudoMode && (
        <div className="sudo-mode" role="status" aria-label="sudo mode activated">
          <div className="sudo-scanlines" aria-hidden="true" />
          <div className="sudo-terminal">
            <p className="sudo-line sudo-line-1"><span className="sudo-prompt">$</span> sudo activate</p>
            <p className="sudo-line sudo-line-2">[sudo] password for kristian: <span className="sudo-asterisk">••••••••</span></p>
            <p className="sudo-line sudo-line-3"><span className="sudo-ok">✓</span> root access granted.</p>
            <p className="sudo-line sudo-line-4">&nbsp;</p>
            <p className="sudo-line sudo-line-5">kernel: Kristian_Lentino/v42.0</p>
            <p className="sudo-line sudo-line-6">power_level: IT'S OVER 9000</p>
            <p className="sudo-line sudo-line-7">λ-calculus engine: <span className="sudo-ok">ONLINE</span></p>
            <p className="sudo-line sudo-line-8">founder mode: <span className="sudo-ok">ENABLED</span></p>
            <p className="sudo-line sudo-line-9">&nbsp;</p>
            <p className="sudo-line sudo-line-10"><span className="sudo-prompt">$</span> chmod 777 reality</p>
            <p className="sudo-line sudo-line-11">chmod: reality: Read-only file system</p>
            <p className="sudo-line sudo-line-12">&nbsp;</p>
            <p className="sudo-line sudo-line-13"><span className="sudo-prompt">$</span> npm run world-domination</p>
            <p className="sudo-line sudo-line-14"><span className="sudo-ok">✓</span> Build succeeded.</p>
            <p className="sudo-line sudo-line-15"><span className="sudo-prompt">$</span> <span className="sudo-cursor">█</span></p>
          </div>
        </div>
      )}
    </>
  )
}

const fuelItems = [
  { title: 'TECH & AI', body: "Frontier agents, Scala, full-stack craft. If it ships and solves a real problem, I'm in." },
  { title: 'STARTUPS', body: 'Founder mode since 2023. Bootstrapping Koomy taught me more than any MBA could.' },
  { title: 'PERSONAL FINANCE', body: 'Loved it so much I joined Moneyfarm, a product I already used, and helped build Share Investing and many other investing features.' },
  { title: 'COMICS', body: 'As you can guess from my website I\'m a big comics fan, so much that I\'ve created my startup based on that.', featured: true },
]

const shelfItems = [
  { title: 'Attack on Titan', image: '/assets/attack-on-titan.webp', body: 'Masterclass in long-game plotting. Every founder should study Erwin.' },
  { title: 'Naruto', image: '/assets/naruto.webp', body: 'The underdog grind. Talent is nice; refusing to quit is better.' },
  { title: 'One Piece', image: '/assets/one-piece.webp', body: "A 29-year vision (with a lot of retcon), executed weekly. That's the startup dream." },
]

function AboutPage({ navigate }: { navigate: (path: string) => void }) {
  return <>
    <section className="page-intro about-intro container">
      <p className="eyebrow">CHAPTER 1 · ORIGIN STORY</p>
      <h1>I hated informatics class. Then I coded a videogame, <span className="accent">and everything changed.</span></h1>
      <div className="about-grid">
        <div className="prose">
          <p>I grew up in Chignolo Po, a small village in Italy. In high school I studied informatics — and honestly, at first I didn't like it at all. Then came a school project: build a videogame. Suddenly coding wasn't homework, it was a superpower. Solving problems and building something from scratch with my own hands hooked me for life.</p>
          <p>Since then I've shipped full-stack products with real customers, built investment features in Scala at a fintech I personally used and loved, and flown to Tokyo to talk Scala on stage at Scala Matsuri. Today <b>I'm building frontier AI agents</b> at Commercetools, automating intake flows for B2B customers.</p>
          <p>And because one adventure is never enough: in 2023 I co-founded <AppLink to="/koomy" navigate={navigate}>Koomy</AppLink>, the platform bringing digital comics to Italy entirely bootstrapped.</p>
        </div>
        <div className="about-media"><MediaSlot src={assetPath('assets/tokyo.webp')} alt="Kristian Lentino speaking in Tokyo" label="casual photo · Tokyo talk?" className="portrait-slot" /><ComicBalloon variant="speech" tone="orange" tail="bottom-right" size="sm" className="village-balloon">Ciao! I'm Kristian 👋🏻</ComicBalloon></div>
      </div>
    </section>
    <section className="content-section container" aria-labelledby="fuel-title"><h2 className="section-kicker section-title" id="fuel-title">WHAT FUELS ME</h2><div className="fuel-grid">{fuelItems.map((item) => <article key={item.title} className={item.featured ? 'compact-panel featured-panel' : 'compact-panel'}><h3>{item.title}</h3><p>{item.body}</p></article>)}</div></section>
    <section className="content-section shelf-section container" aria-labelledby="shelf-title"><h2 className="section-kicker section-title" id="shelf-title">THE SHELF OF HONOR</h2><div className="shelf-grid">{shelfItems.map((item) => <article className="shelf-card" key={item.title}><MediaSlot src={item.image} alt={`${item.title} manga cover`} label="cover" className="cover-slot" /><div><h3>{item.title}</h3><p>{item.body}</p></div></article>)}</div></section>
  </>
}

function useCount(target: number) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setValue(target); return }
    const start = performance.now()
    let frame = 0
    const tick = (time: number) => {
      const progress = Math.min(1, (time - start) / 1500)
      setValue(Math.round(target * (1 - Math.pow(1 - progress, 3))))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target])
  return value
}

function KoomyPage() {
  const users = useCount(10000)
  const mau = useCount(1000)
  const nps = useCount(42)
  const artworks = useCount(4000)
  return (
    <>
      <section className="koomy-hero">
        <div className="speedlines" aria-hidden="true" />
        <div className="container koomy-hero-grid">
          <div>
            <p className="koomy-kicker">CHAPTER 2 · THE STARTUP SAGA · FOUNDED 2023</p>
            <h1><img src={assetPath('assets/koomy-logo.webp')} alt="Koomy" /></h1>
            <p className="koomy-lead">Italy's home for official digital comics. Read manga, comics and graphic novels across iOS, Android, and web, with free previews and an advances reader built to read comics on screens.</p>
            <div className="button-row">
              <a className="button koomy-primary" href="https://koomy.it" target="_blank" rel="noreferrer">Visit koomy.it ↗</a>
              <a className="button koomy-secondary" href="https://www.koomy.it/monster-allergy" target="_blank" rel="noreferrer">Monster Allergy exclusive ↗</a>
            </div>
          </div>
          <div className="phone-wrap">
            <MediaSlot src={assetPath('assets/koomy-reader.webp')} alt="Koomy app home screen with featured comics and navigation" label={'app screenshot\n(home screen)'} className="phone-slot" priority />
            <ComicBalloon variant="shout" tone="surface" tail="none" size="sm" className="free-balloon">Discover our platform!!!</ComicBalloon>
          </div>
        </div>
      </section>

      <section className="metric-band" aria-label="Koomy metrics">
        <div><strong>{users >= 10000 ? '10k+' : users.toLocaleString()}</strong><span>Registered readers</span></div>
        <div><strong>{mau >= 1000 ? '1k+' : mau.toLocaleString()}</strong><span>Monthly active readers</span></div>
        <div><strong>{nps}</strong><span>NPS - it never stops climbing</span></div>
        <div><strong>{artworks}+</strong><span>Comics available</span></div>
      </section>

      <section className="koomy-origin container" aria-labelledby="koomy-origin-title">
        <div className="koomy-origin-copy">
          <p className="section-kicker section-title">WHY I BUILT IT</p>
          <h2 id="koomy-origin-title">It began with a reader problem, not a pitch deck.</h2>
          <div className="prose">
            <p>I was a comics reader long before I was a founder. As a student I had time but little money; later I had money but almost no time. Shelves filled up, prices rose, and Italy still lacked a simple legal place to discover and read comics digitally.</p>
            <p>Lockdown made that gap impossible to ignore. In 2021, Zoran, Matteo, and I turned a Burger King question into a decision: if nobody else was building the platform we wanted, we would build it ourselves.</p>
          </div>
        </div>
        <ol className="origin-steps" aria-label="Koomy origin milestones">
          <li><span>2012</span><div><strong>Reader first</strong><p>The obsession starts: manga, comics, and a steadily shrinking amount of shelf space.</p></div></li>
          <li><span>2021</span><div><strong>The Burger King question</strong><p>Why was there still no strong legal digital home for comics in Italian?</p></div></li>
          <li><span>2023</span><div><strong>Koomy is founded</strong><p>A bootstrapped company forms around a problem we understood personally.</p></div></li>
          <li><span>2025</span><div><strong>The platform launches</strong><p>Official comics, publisher partnerships, and a community-led product go live.</p></div></li>
        </ol>
      </section>

      <section className="koomy-decisions">
        <div className="container">
          <div className="decision-heading">
            <h2>Reader frustrations became product decisions.</h2>
            <p>No feature starts with novelty. Each one removes a reason readers had to settle for a fragmented or illegal experience.</p>
          </div>
          <div className="decision-list">
            <article><span>01</span><h3>Try before you unlock</h3><p>Every title begins with a 10% free preview, so discovery does not require a blind purchase.</p></article>
            <article><span>02</span><h3>Read wherever life happens</h3><p>Immediate access across iOS, Android, and web, including offline reading when the connection disappears.</p></article>
            <article><span>03</span><h3>Reward legal reading</h3><p>Kooins unlock comics, while daily, weekly, monthly, and milestone Quests let active readers earn more.</p></article>
            <article><span>04</span><h3>Build one credible home</h3><p>Leading publishers, digital exclusives, and space for Italian creators belong in one simple catalog.</p></article>
          </div>
        </div>
      </section>

      <section className="koomy-exclusive container" aria-labelledby="exclusive-title">
        <div>
          <span className="section-kicker">DIGITAL EXCLUSIVE · TUNUÈ</span>
          <h2 id="exclusive-title">Monster Allergy arrives in a format made for screens.</h2>
          <p>Ten volumes and thirty episodes from Centomo and Artibani, illustrated by Barbucci and Canepa. The first episode is free.</p>
        </div>
        <a className="button koomy-exclusive-link" href="https://www.koomy.it/monster-allergy" target="_blank" rel="noreferrer">Discover the saga ↗</a>
      </section>

      <section className="koomy-mission container" aria-labelledby="koomy-mission-title">
        <div>
          <p className="section-kicker section-title">THE BIGGER MISSION</p>
          <h2 id="koomy-mission-title">Not replacing paper. Expanding access.</h2>
        </div>
        <div className="prose">
          <p>Paper and digital are allies. Koomy is there when you are away from your shelves, want to sample a new series without risk, or prefer a digital edition designed for the device in your hand.</p>
          <p>The longer ambition is bigger than the reader: help Italian creators reach audiences, give publishers a credible digital channel, and make legal digital comics worthy of the passion around them.</p>
          <a className="text-link" href="https://www.koomy.it/articoli/benvenuti-su-koomy" target="_blank" rel="noreferrer">Read the full Koomy origin story ↗</a>
        </div>
      </section>
    </>
  )
}

const timelineArcs = [
  { year: '2019', tag: 'ARC 1 · FIRST QUEST', title: 'Zucchetti → Dieffetech', body: 'First job out of high school at Zucchetti; five months later, a leap to Dieffetech as a Full-Stack Developer. Real customers, real discussions, real challenges. I started farming EXP in the sector.' },
  { year: '2022', tag: 'ARC 2 · FINTECH SAGA', title: 'Moneyfarm', body: 'Joined a product I already used and loved. Worked mainly in Scala and helped build the Share Investing proposition, launched in 2024.' },
  { year: '2023', tag: 'ARC 3 · THE FOUNDING', title: 'Koomy is born', body: "Co-founded Koomy: Italy's digital comics platform. Bootstrapped from zero to 10k+ readers, 1k+ monthly actives, NPS 42, and partnerships with major Italian publishers such as Panini, Tunué and Edizioni BD.", featured: true },
  { year: '2024', tag: 'ARC 4 · TOKYO CHAPTER', title: 'Scala Matsuri, Tokyo', body: 'Flew to Japan to speak about Scala on stage at Scala Matsuri. A talk in the homeland of manga — the crossover episode.' },
  { year: '2024', tag: 'ARC 5 · NEW GUILD', title: 'commercetools', body: 'Joined commercetools in July 2024. Now responsible for building frontier AI agents that automate intake flows for B2B customers.' },
  { year: 'NOW', tag: 'ARC 6 · ONGOING', title: 'The Agent Era', body: 'Building the next change with Agents during the day and working on Koomy growth during the night. The best arc is always the current one.', featured: true, current: true },
]

function TimelinePage() {
  const timelineRef = useRef<HTMLElement>(null)
  const [isTracing, setIsTracing] = useState(() => typeof IntersectionObserver === 'undefined')

  useEffect(() => {
    const timeline = timelineRef.current
    if (!timeline || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      setIsTracing(true)
      observer.unobserve(entry.target)
    }, { threshold: 0.12 })

    observer.observe(timeline)
    return () => observer.disconnect()
  }, [])

  const tracingClass = isTracing ? ' is-tracing' : ''

  return <><section className="timeline-intro timeline-container"><p className="eyebrow">CHAPTER 3 · ALL ARCS, IN ORDER</p><h1>The timeline<span className="accent">.</span></h1><p className="lead">From a school videogame in Chignolo Po to frontier AI agents and a comics startup. Arc by arc.</p><aside className={`timeline-throughline${tracingClass}`} aria-label="The throughline"><p>THE THROUGHLINE</p><blockquote>Every arc of this story adds new skills to my arsenal. <br/> <strong>The founder mindset connected them.</strong></blockquote></aside></section><section ref={timelineRef} className={`timeline-list timeline-container${tracingClass}`} aria-label="Career timeline">{timelineArcs.map((arc, index) => <article className="timeline-item" style={{ '--timeline-delay': `${340 + index * 440}ms` } as CSSProperties} key={`${arc.year}-${arc.title}`}><div className="timeline-year">{arc.year}</div><div className="timeline-track"><span className={[arc.featured && 'featured-dot', arc.current && 'current-dot'].filter(Boolean).join(' ')} data-testid={arc.current ? 'current-timeline-dot' : undefined} />{index < timelineArcs.length - 1 && <i data-testid="timeline-segment" />}</div><div className={arc.featured ? 'timeline-card is-featured' : 'timeline-card'}><div><span>{arc.tag}</span><h2>{arc.title}</h2></div><p>{arc.body}</p></div></article>)}</section></>
}

function ContactPage({ navigate: _navigate }: { navigate?: (path: string) => void }) {
  return <section className="contact-page container"><div><p className="eyebrow">FINAL CHAPTER · SAY HI</p><h1>Building something? Investing in comics? Just love manga? <span className="accent">Let's talk.</span></h1><div className="contact-lead-row"><p className="lead">I'm always up for conversations about AI agents, startups, personal finance, Scala or why the Marineford arc still hits different.</p><ComicBalloon variant="whisper" tail="bottom-right" size="sm" className="contact-whisper">Psst… email is the fastest route.</ComicBalloon></div><div className="contact-grid"><a href="https://www.linkedin.com/in/kristian-lentino-941694166/" target="_blank" rel="noreferrer" className="contact-card"><strong>LINKEDIN</strong><h2>Kristian Lentino</h2><span>The professional feed ↗</span></a><a href="mailto:hello@koomy.it" className="contact-card featured-panel"><strong>EMAIL</strong><h2>hello@koomy.it</h2><span>Fastest way to reach me</span></a><a href="https://t.me/KLENTINO99" target="_blank" rel="noreferrer" className="contact-card" aria-label="Telegram KLENTINO99"><strong>TELEGRAM</strong><h2>@KLENTINO99</h2><span>Message me directly ↗</span></a><a href="https://koomy.it" target="_blank" rel="noreferrer" className="contact-card"><strong>KOOMY</strong><h2>koomy.it</h2><span>See what we're building ↗</span></a></div></div></section>
}

export default function App() {
  const { path, navigate } = useRoute()
  const { theme, toggle } = useTheme()
  const page = useMemo(() => {
    switch (path) {
      case '/about': return <AboutPage navigate={navigate as (p: string) => void} />
      case '/koomy': return <KoomyPage />
      case '/timeline': return <TimelinePage />
      case '/contact': return <ContactPage />
      default: return <HomePage navigate={navigate as (p: string) => void} />
    }
  }, [path])

  useEffect(() => {
    const url = `https://kristianlentino.it${path === '/' ? '/' : path}`
    document.title = PAGE_TITLES[path]
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', url)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', PAGE_TITLES[path])
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', url)
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', PAGE_TITLES[path])
  }, [path])

  const next = path === '/' ? undefined : path === '/about' ? { path: '/koomy', label: 'Next chapter: Koomy →' } : path === '/koomy' ? { path: '/timeline', label: 'Next chapter: the full timeline →' } : path === '/timeline' ? { path: '/contact', label: 'Final chapter: say hi →' } : undefined
  return <PageShell path={path} items={NAV_ITEMS} theme={theme} onNavigate={navigate} onToggleTheme={toggle} footer={next}>{page}</PageShell>
}
