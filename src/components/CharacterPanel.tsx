import { useState } from 'react'
import { assetPath } from '../routing'
import MediaSlot from './MediaSlot'
import PowerBar from './PowerBar'

interface CharacterGear {
  id: string
  name: string
  role: string
  image: string
  alt: string
  level: string
  nextQuest: string
  xp: number
  badges: Array<{ symbol: string; label: string }>
  stats: Array<{ name: string; level: string; value: number }>
  moves: Array<{ name: string; featured?: boolean }>
}

const CHARACTER_GEARS: CharacterGear[] = [
  {
    id: 'founder',
    name: 'FOUNDER GEAR',
    role: 'FOUNDER GEAR · BUILD THE COMPANY',
    image: 'assets/avatars/avatar-2d.webp',
    alt: 'Kristian Lentino in Founder Gear',
    level: 'LEVEL 27 · FOUNDER',
    nextQuest: 'NEXT QUEST: SCALE KOOMY',
    xp: 86,
    badges: [
      { symbol: '↗', label: 'Growth strategy' },
      { symbol: '€', label: 'Business fundamentals' },
      { symbol: '⚡', label: 'Founder speed' },
      { symbol: '✦', label: 'Comics vision' },
    ],
    stats: [
      { name: 'FOUNDER GRIT', level: 'LV. ∞', value: 100 },
      { name: 'PRODUCT VISION', level: 'LV. 95', value: 95 },
      { name: 'BUSINESS STRATEGY', level: 'LV. 91', value: 91 },
      { name: 'PARTNERSHIP BUILDING', level: 'LV. 88', value: 88 },
    ],
    moves: [
      { name: 'Bootstrap Defense', featured: true },
      { name: 'Publisher Alliance' },
      { name: 'Runway Instinct' },
      { name: 'Panel-by-Panel Vision' },
    ],
  },
  {
    id: 'builder',
    name: 'BUILDER GEAR',
    role: 'BUILDER GEAR · SHIP THE SYSTEM',
    image: 'assets/avatars/building_mode.webp',
    alt: 'Kristian Lentino in armored Builder Gear avatar',
    level: 'LEVEL 27 · ENGINEER',
    nextQuest: 'NEXT QUEST: COMPOUND THE CRAFT',
    xp: 78,
    badges: [
      { symbol: 'λ', label: 'Functional Programming' },
      { symbol: 'AI', label: 'AI agents' },
      { symbol: '</>', label: 'Full-stack engineering' },
      { symbol: '⚡', label: 'Shipping velocity' },
    ],
    stats: [
      { name: 'FULL-STACK ENGINEERING', level: 'LV. 96', value: 96 },
      { name: 'SCALA & BACKEND', level: 'LV. 94', value: 94 },
      { name: 'AI AGENTS', level: 'LV. 91', value: 91 },
      { name: 'SHIPPING VELOCITY', level: 'LV. 98', value: 98 },
    ],
    moves: [
      { name: 'Ship-It Beam', featured: true },
      { name: 'Type-Safe Strike' },
      { name: 'Agent Summoning' },
      { name: 'Zero-Downtime Deploy' },
    ],
  },
]

export default function CharacterPanel() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const gear = CHARACTER_GEARS[selectedIndex]
  const selectGear = (direction: -1 | 1) => {
    setSelectedIndex(
      (current) => (current + direction + CHARACTER_GEARS.length) % CHARACTER_GEARS.length,
    )
  }

  return (
    <section className="character-section" aria-labelledby="character-heading">
      <div className="character-card">
        <div className="select-label">SELECT YOUR KRISTIAN</div>
        <div className="avatar-wrap gear-swap" key={gear.id}>
          <MediaSlot
            src={assetPath(gear.image)}
            alt={gear.alt}
            label={`${gear.name} avatar`}
            className="avatar-slot"
          />
          {gear.badges.map((badge, index) => (
            <span
              className={`gear-badge badge-${index + 1}`}
              title={badge.label}
              aria-hidden="true"
              key={badge.label}
            >
              {badge.symbol}
            </span>
          ))}
        </div>
        <div className="gear-caption">
          <button
            type="button"
            className="gear-nav"
            onClick={() => selectGear(-1)}
            aria-label={`Previous gear: ${CHARACTER_GEARS[(selectedIndex - 1 + CHARACTER_GEARS.length) % CHARACTER_GEARS.length].name}`}
          >
            ←
          </button>
          <strong aria-live="polite">
            SET {selectedIndex + 1} / {CHARACTER_GEARS.length} · {gear.name}
          </strong>
          <button
            type="button"
            className="gear-nav"
            onClick={() => selectGear(1)}
            aria-label={`Next gear: ${CHARACTER_GEARS[(selectedIndex + 1) % CHARACTER_GEARS.length].name}`}
          >
            →
          </button>
        </div>
      </div>

      <div className="stats-panel gear-swap" key={`${gear.id}-stats`}>
        <div className="section-kicker" id="character-heading">
          CHARACTER STATS
        </div>
        <h2 className="display-name">KRISTIAN LENTINO</h2>
        <p className="gear-role">{gear.role}</p>
        <div className="level-row">
          <strong>{gear.level}</strong>
          <span>
            {gear.nextQuest}
            <span className="cursor">▮</span>
          </span>
        </div>
        <PowerBar value={gear.xp} className="xp-bar" />
        <div className="power-list">
          {gear.stats.map((stat) => (
            <div key={stat.name}>
              <div className="power-label">
                <strong>{stat.name}</strong>
                <span>{stat.level}</span>
              </div>
              <PowerBar value={stat.value} />
            </div>
          ))}
        </div>
        <div className="moves">
          <strong>SPECIAL MOVES:</strong>
          {gear.moves.map((move) => (
            <span className={move.featured ? 'move-featured' : undefined} key={move.name}>
              {move.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
