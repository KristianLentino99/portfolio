import AppLink from '../components/AppLink'
import CharacterPanel from '../components/CharacterPanel'
import ComicBalloon from '../components/ComicBalloon'
import SudoOverlay from '../components/home/SudoOverlay'
import MediaSlot from '../components/MediaSlot'
import Sticker from '../components/Sticker'
import LinkedInLink from '../components/social/LinkedInLink'
import Ticker from '../components/Ticker'
import useSudoSequence from '../hooks/useSudoSequence'
import { assetPath, type RoutePath } from '../routing'

interface HomePageProps {
  navigate: (path: RoutePath) => void
}

const tickerItems = [
  '$ npm run world-domination',
  "IT'S OVER 9000",
  'the answer is 42',
  'λ > OOP',
  'nakama > everything',
  'git commit -m "ship it"',
  'do a barrel roll',
  'sudo make me a founder',
  'One Piece > sleep',
  'console.log("gm")',
]

const sagaArcs = [
  {
    arc: 'ARC 1 · 2019',
    title: 'First Quest',
    body: 'Zucchetti → Dieffetech. Full-stack, where the journey started.',
  },
  {
    arc: 'ARC 2 · 2022',
    title: 'Fintech Saga',
    body: 'Worked in Moneyfarm, leading digital asset management platform bringing Share Investing to our customers.',
  },
  {
    arc: 'ARC 3 · 2023',
    title: 'Koomy is born',
    body: "Co-founded Italy's digital comics platform.",
    featured: true,
  },
  {
    arc: 'ARC 4 · 2024',
    title: 'Tokyo Chapter',
    body: 'Spoke at Scala Matsuri and later joined Commercetools as BE Engineer.',
  },
  {
    arc: 'ARC 5 · NOW',
    title: 'Agent Era',
    body: 'Frontier AI agents by day, Koomy growth by night.',
  },
]

export default function HomePage({ navigate }: HomePageProps) {
  const sudoMode = useSudoSequence()

  return (
    <>
      <section className="hero home-hero">
        <div className="hero-copy">
          <p className="eyebrow">ENGINEER · FOUNDER</p>
          <h1>
            I build software with engineering rigor
            <br />
            <span className="accent">and shonen energy.</span>
          </h1>
          <p className="lead">
            Hey there, I'm Kristian 👋🏻. <br />I love to build things and right now I'm working on{' '}
            <b>AI agents</b> at commercetools and I'm the co-founder of{' '}
            <b>Koomy: the Italy's digital comics platform </b>. As you can guess I'm a big comics
            and manga fan.
          </p>
          <div className="button-row">
            <AppLink to="/koomy" navigate={navigate} className="button button-primary">
              The Koomy story →
            </AppLink>
            <AppLink to="/contact" navigate={navigate} className="button button-secondary">
              Get in touch
            </AppLink>
            <LinkedInLink className="button button-icon" />
          </div>
        </div>
        <div className="hero-media">
          <MediaSlot
            src={assetPath('assets/Kristian_Lentino.webp')}
            alt="Portrait of Kristian Lentino"
            className="portrait-slot"
            priority
          />
          <ComicBalloon variant="thought" tail="bottom-left" size="sm" className="home-thought">
            What should we build next?
          </ComicBalloon>
          <Sticker className="founder-sticker">Founder mode: ON</Sticker>
        </div>
      </section>
      <Ticker items={tickerItems} />
      <div className="character-band">
        <div className="container">
          <CharacterPanel />
          <aside className="now-panel" aria-label="What Kristian is doing right now">
            <h2>MEANWHILE, RIGHT NOW…</h2>
            <div className="now-grid">
              <div>
                <strong>READING</strong>
                <span>One Piece, the ritual since forever.</span>
              </div>
              <div>
                <strong>BUILDING</strong>
                <span>
                  Koomy with the ambition to bring digital comics to every reader in Italy.
                </span>
              </div>
              <div>
                <strong>TRAINING</strong>
                <span>
                  Frontier AI agents at commercetools leveraging on LLM to automate and cut costs
                  for our customers.
                </span>
              </div>
              <div>
                <strong>LAST SEEN</strong>
                <span>
                  On stage at Scala Matsuri in Tokyo talking about Scala in the homeland of manga.
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>
      <section className="saga-section container" aria-labelledby="saga-title">
        <div className="section-heading-row">
          <h2 id="saga-title" className="narration-label">
            PREVIOUSLY, IN THIS SAGA…
          </h2>
          <AppLink to="/timeline" navigate={navigate} className="text-link">
            Full timeline →
          </AppLink>
        </div>
        <div className="arc-strip">
          {sagaArcs.map((arc) => (
            <article
              key={arc.arc}
              className={arc.featured ? 'arc-card featured-panel' : 'arc-card'}
            >
              <span>{arc.arc}</span>
              <h3>{arc.title}</h3>
              <p>{arc.body}</p>
            </article>
          ))}
        </div>
      </section>
      <SudoOverlay active={sudoMode} />
    </>
  )
}
