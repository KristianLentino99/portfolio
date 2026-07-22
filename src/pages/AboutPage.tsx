import AppLink from '../components/AppLink'
import ComicBalloon from '../components/ComicBalloon'
import MediaSlot from '../components/MediaSlot'
import LinkedInLink from '../components/social/LinkedInLink'
import { assetPath, type RoutePath } from '../routing'

interface AboutPageProps {
  navigate: (path: RoutePath) => void
}

const fuelItems = [
  {
    title: 'TECH & AI',
    body: "Frontier agents, Scala, full-stack craft. If it ships and solves a real problem, I'm in.",
  },
  {
    title: 'STARTUPS',
    body: 'Founder mode since 2023. Bootstrapping Koomy taught me more than any MBA could.',
  },
  {
    title: 'PERSONAL FINANCE',
    body: 'Loved it so much I joined Moneyfarm, a product I already used, and helped build Share Investing and many other investing features.',
  },
  {
    title: 'COMICS',
    body: "As you can guess from my website I'm a big comics fan, so much that I've created my startup based on that.",
    featured: true,
  },
]

const shelfItems = [
  {
    title: 'Attack on Titan',
    image: '/assets/attack-on-titan.webp',
    body: 'Masterclass in long-game plotting. Every founder should study Erwin.',
  },
  {
    title: 'Naruto',
    image: '/assets/naruto.webp',
    body: 'The underdog grind. Talent is nice but refusing to quit and achieve your goal is even better.',
  },
  {
    title: 'One Piece',
    image: '/assets/one-piece.webp',
    body: "A 29-year vision (with a lot of retcon), executed weekly. That's the startup dream.",
  },
]

export default function AboutPage({ navigate }: AboutPageProps) {
  return (
    <>
      <section className="page-intro about-intro container">
        <p className="eyebrow">CHAPTER 1 · ORIGIN STORY</p>
        <h1>
          I hated informatics class. Then I coded a videogame,{' '}
          <span className="accent">and everything changed.</span>
        </h1>
        <div className="about-grid">
          <div className="prose">
            <p>
              I grew up in Chignolo Po, a small village in Italy. In high school I studied
              informatics — and honestly, at first I didn't like it at all. Then came a school
              project: build a videogame. Suddenly coding wasn't homework, it was a superpower.
              Solving problems and building something from scratch with my own hands hooked me for
              life.
            </p>
            <p>
              Since then I've shipped full-stack products with real customers, built investment
              features in Scala at a fintech I personally used and loved, and flown to Tokyo to talk
              Scala on stage at Scala Matsuri. Today <b>I'm building frontier AI agents</b> at
              Commercetools, automating intake flows for B2B customers.
            </p>
            <p>
              And because one adventure is never enough: in 2023 I co-founded{' '}
              <AppLink to="/koomy" navigate={navigate}>
                Koomy
              </AppLink>
              , the platform bringing digital comics to Italy entirely bootstrapped.
            </p>
            <p>
              <LinkedInLink className="button button-icon" />
            </p>
          </div>
          <div className="about-media">
            <MediaSlot
              src={assetPath('assets/tokyo.webp')}
              alt="Kristian Lentino speaking in Tokyo"
              className="portrait-slot"
            />
            <ComicBalloon
              variant="speech"
              tone="orange"
              tail="bottom-right"
              size="sm"
              className="village-balloon"
            >
              Ciao! I'm Kristian 👋🏻
            </ComicBalloon>
          </div>
        </div>
      </section>
      <section className="content-section container" aria-labelledby="fuel-title">
        <h2 className="section-kicker section-title" id="fuel-title">
          WHAT FUELS ME
        </h2>
        <div className="fuel-grid">
          {fuelItems.map((item) => (
            <article
              key={item.title}
              className={item.featured ? 'compact-panel featured-panel' : 'compact-panel'}
            >
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="content-section shelf-section container" aria-labelledby="shelf-title">
        <h2 className="section-kicker section-title" id="shelf-title">
          THE SHELF OF HONOR
        </h2>
        <div className="shelf-grid">
          {shelfItems.map((item) => (
            <article className="shelf-card" key={item.title}>
              <MediaSlot
                src={item.image}
                alt={`${item.title} manga cover`}
                className="cover-slot"
              />
              <div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
