import ComicBalloon from '../components/ComicBalloon'
import ContactCard from '../components/contact/ContactCard'

export default function ContactPage() {
  return (
    <section className="contact-page container">
      <div>
        <p className="eyebrow">FINAL CHAPTER · SAY HI</p>
        <h1>
          Building something? Investing in comics? Just love manga?{' '}
          <span className="accent">Let's talk.</span>
        </h1>
        <div className="contact-lead-row">
          <p className="lead">
            I'm always up for conversations about AI agents, startups, personal finance, Programming or
            why the Marineford arc still hits different.
          </p>
          <ComicBalloon variant="whisper" tail="bottom-right" size="sm" className="contact-whisper">
            Psst… Linkedin or Telegram are the fastest route.
          </ComicBalloon>
        </div>
        <div className="contact-grid">
          <ContactCard
            href="https://www.linkedin.com/in/kristian-lentino/"
            channel="LINKEDIN"
            title="Kristian Lentino"
            newTab
          >
            The professional feed ↗
          </ContactCard>
          <ContactCard
            href="https://t.me/KLENTINO99"
            channel="TELEGRAM"
            title="@KLENTINO99"
            ariaLabel="Telegram KLENTINO99"
            newTab
            featured
          >
            Message me directly ↗
          </ContactCard>

          <ContactCard
            href="mailto:kristianlentino@gmail.com"
            channel="EMAIL"
            title="kristianlentino@gmail.com"
          >
            Fastest way to reach me
          </ContactCard>
          <ContactCard href="https://koomy.it" channel="KOOMY" title="koomy.it" newTab>
            See what we're building ↗
          </ContactCard>
        </div>
      </div>
    </section>
  )
}
