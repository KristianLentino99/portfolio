import useCountUp from '../../hooks/useCountUp'

export default function KoomyMetricBand() {
  const users = useCountUp(10000)
  const mau = useCountUp(1000)
  const nps = useCountUp(42)
  const artworks = useCountUp(4000)

  return (
    <section className="metric-band" aria-label="Koomy metrics">
      <div>
        <strong>{users >= 10000 ? '10k+' : users.toLocaleString()}</strong>
        <span>Registered readers</span>
      </div>
      <div>
        <strong>{mau >= 1000 ? '1k+' : mau.toLocaleString()}</strong>
        <span>Monthly active readers</span>
      </div>
      <div>
        <strong>{nps}</strong>
        <span>NPS that grows each quarter</span>
      </div>
      <div>
        <strong>4.6</strong>
        <span>Avg. Rating on the stores</span>
      </div>
      <div>
        <strong>{artworks}+</strong>
        <span>Comics available</span>
      </div>
    </section>
  )
}
