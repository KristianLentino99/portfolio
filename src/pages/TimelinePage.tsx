import TimelineEntry, { type TimelineArc } from '../components/timeline/TimelineEntry'
import useTimelineTracing from '../hooks/useTimelineTracing'

const timelineArcs: TimelineArc[] = [
  {
    year: '2019',
    tag: 'ARC 1 · FIRST QUEST',
    title: 'Zucchetti → Dieffetech',
    body: 'First job out of high school at Zucchetti; five months later, a leap to Dieffetech as a Full-Stack Developer. Real customers, real discussions, real challenges. I started farming EXP in the sector.',
  },
  {
    year: '2022',
    tag: 'ARC 2 · FINTECH SAGA',
    title: 'Moneyfarm',
    body: 'Joined a product I already used and loved. Worked mainly in Scala and helped build the Share Investing proposition, launched in 2024.',
  },
  {
    year: '2023',
    tag: 'ARC 3 · THE FOUNDING',
    title: 'Koomy is born',
    body: "Co-founded Koomy: Italy's digital comics platform. Bootstrapped from zero to 10k+ readers, 1k+ monthly actives, NPS 42, and partnerships with major Italian publishers such as Panini, Tunué and Edizioni BD.",
    featured: true,
  },
  {
    year: '2024',
    tag: 'ARC 4 · TOKYO CHAPTER',
    title: 'Scala Matsuri, Tokyo',
    body: 'Flew to Japan to speak about Scala on stage at Scala Matsuri. A talk in the homeland of manga — the crossover episode.',
  },
  {
    year: '2024',
    tag: 'ARC 5 · NEW GUILD',
    title: 'commercetools',
    body: 'Joined commercetools in July 2024. Now responsible for building frontier AI agents that automate intake flows for B2B customers.',
  },
  {
    year: 'NOW',
    tag: 'ARC 6 · ONGOING',
    title: 'The Agent Era',
    body: 'Building the next change with Agents during the day and working on Koomy growth during the night. The best arc is always the current one.',
    featured: true,
    current: true,
  },
]

export default function TimelinePage() {
  const { timelineRef, isTracing } = useTimelineTracing()
  const tracingClass = isTracing ? ' is-tracing' : ''

  return (
    <>
      <section className="timeline-intro timeline-container">
        <p className="eyebrow">CHAPTER 3 · ALL ARCS, IN ORDER</p>
        <h1>
          The timeline<span className="accent">.</span>
        </h1>
        <p className="lead">
          From a school videogame in Chignolo Po to frontier AI agents and a comics startup. Arc by
          arc.
        </p>
        <aside className={`timeline-throughline${tracingClass}`} aria-label="The throughline">
          <p>THE THROUGHLINE</p>
          <blockquote>
            Every arc of this story adds new skills to my arsenal. <br />{' '}
            <strong>The founder mindset connected them.</strong>
          </blockquote>
        </aside>
      </section>
      <section
        ref={timelineRef}
        className={`timeline-list timeline-container${tracingClass}`}
        aria-label="Career timeline"
      >
        {timelineArcs.map((arc, index) => (
          <TimelineEntry
            key={`${arc.year}-${arc.title}`}
            arc={arc}
            index={index}
            isLast={index === timelineArcs.length - 1}
          />
        ))}
      </section>
    </>
  )
}
