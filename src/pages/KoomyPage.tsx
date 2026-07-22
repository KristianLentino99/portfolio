import ComicBalloon from '../components/ComicBalloon'
import KoomyMetricBand from '../components/koomy/KoomyMetricBand'
import MediaSlot from '../components/MediaSlot'
import { assetPath } from '../routing'

export default function KoomyPage() {
  return (
    <>
      <section className="koomy-hero">
        <div className="speedlines" aria-hidden="true" />
        <div className="container koomy-hero-grid">
          <div>
            <p className="koomy-kicker">CHAPTER 2 · THE STARTUP SAGA · FOUNDED 2023</p>
            <h1>
              <img
                src={assetPath('assets/koomy-logo.webp')}
                alt="Koomy"
                fetchPriority="high"
                loading="eager"
                decoding="sync"
              />
            </h1>
            <p className="koomy-lead">
              Italy's home for official digital comics. Read manga, comics and graphic novels across
              iOS, Android, and web, with free previews and an advances reader built to read comics
              on screens.
            </p>
            <div className="button-row">
              <a
                className="button koomy-primary"
                href="https://koomy.it"
                target="_blank"
                rel="noreferrer"
              >
                Visit koomy.it ↗
              </a>
              <a
                className="button koomy-secondary"
                href="https://www.koomy.it/monster-allergy"
                target="_blank"
                rel="noreferrer"
              >
                Monster Allergy exclusive ↗
              </a>
            </div>
          </div>
          <div className="phone-wrap">
            <MediaSlot
              src={assetPath('assets/koomy-reader.webp')}
              alt="Koomy app home screen with featured comics and navigation"
              className="phone-slot"
              priority
            />
            <ComicBalloon
              variant="shout"
              tone="surface"
              tail="none"
              size="sm"
              className="free-balloon"
            >
              Discover our platform!!!
            </ComicBalloon>
          </div>
        </div>
      </section>

      <KoomyMetricBand />

      <section className="koomy-origin container" aria-labelledby="koomy-origin-title">
        <div className="koomy-origin-copy">
          <p className="section-kicker section-title">WHY I BUILT IT</p>
          <h2 id="koomy-origin-title">It began with a reader problem, not a pitch deck.</h2>
          <div className="prose">
            <p>
              I was a comics reader long before I was a founder. As a student I had time but little
              money; later I had money but almost no time. Shelves filled up, prices rose, and Italy
              still lacked a simple legal place to discover and read comics digitally.
            </p>
            <p>
              Lockdown made that gap impossible to ignore. In 2021, Zoran, Matteo, and I turned a
              Burger King question into a decision: if nobody else was building the platform we
              wanted, we would build it ourselves.
            </p>
          </div>
        </div>
        <ol className="origin-steps" aria-label="Koomy origin milestones">
          <li>
            <span>2012</span>
            <div>
              <strong>Reader first</strong>
              <p>
                The obsession starts: manga, comics, and a steadily shrinking amount of shelf space.
              </p>
            </div>
          </li>
          <li>
            <span>2021</span>
            <div>
              <strong>The Burger King question</strong>
              <p>Why was there still no strong legal digital home for comics in Italian?</p>
            </div>
          </li>
          <li>
            <span>2023</span>
            <div>
              <strong>Koomy is founded</strong>
              <p>A bootstrapped company forms around a problem we understood personally.</p>
            </div>
          </li>
          <li>
            <span>2025</span>
            <div>
              <strong>The platform launches</strong>
              <p>Official comics, publisher partnerships, and a community-led product go live.</p>
            </div>
          </li>
        </ol>
      </section>

      <section className="koomy-decisions">
        <div className="container">
          <div className="decision-heading">
            <h2>Reader frustrations became product decisions.</h2>
            <p>
              No feature starts with novelty. Each one removes a reason readers had to settle for a
              fragmented or illegal experience.
            </p>
          </div>
          <div className="decision-list">
            <article>
              <span>01</span>
              <h3>Try before you unlock</h3>
              <p>
                Every title begins with a 10% free preview, so discovery does not require a blind
                purchase.
              </p>
            </article>
            <article>
              <span>02</span>
              <h3>Read wherever life happens</h3>
              <p>
                Immediate access across iOS, Android, and web, including offline reading when the
                connection disappears.
              </p>
            </article>
            <article>
              <span>03</span>
              <h3>Reward legal reading</h3>
              <p>
                Kooins unlock comics, while daily, weekly, monthly, and milestone Quests let active
                readers earn more.
              </p>
            </article>
            <article>
              <span>04</span>
              <h3>Build one credible home</h3>
              <p>
                Leading publishers, digital exclusives, and space for Italian creators belong in one
                simple catalog.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="koomy-exclusive container" aria-labelledby="exclusive-title">
        <div>
          <span className="section-kicker">One goal I’m quite proud of:</span>
          <h2 id="exclusive-title">Monster Allergy arrives in a format made for screens.</h2>
          <p>
            We were able to publish digitally, thanks to the collaboration with Tunuè, one of the most famous Italian IP in the early 2000. Ten volumes arranged in a new format with thirty episodes with first episode free for everyone!
          </p>
        </div>
        <a
          className="button koomy-exclusive-link"
          href="https://www.koomy.it/monster-allergy"
          target="_blank"
          rel="noreferrer"
        >
          Learn more about it ↗
        </a>
      </section>

      <section className="koomy-mission container" aria-labelledby="koomy-mission-title">
        <div>
          <p className="section-kicker section-title">THE BIGGER MISSION</p>
          <h2 id="koomy-mission-title">Not replacing paper. Expanding access.</h2>
        </div>
        <div className="prose">
          <p>
            Paper and digital are allies. Koomy is there when you are away from your shelves, want
            to sample a new series without risk, or prefer a digital edition designed for the device
            in your hand.
          </p>
          <p>
            The longer ambition is bigger than the reader: help Italian creators reach audiences,
            give publishers a credible digital channel, and make legal digital comics worthy of the
            passion around them.
          </p>
          <a
            className="text-link"
            href="https://www.koomy.it/articoli/benvenuti-su-koomy"
            target="_blank"
            rel="noreferrer"
          >
            Read the full Koomy origin story ↗
          </a>
        </div>
      </section>
    </>
  )
}
