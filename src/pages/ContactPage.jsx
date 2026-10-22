import Breadcrumbs from '../components/Breadcrumbs'
import Icon from '../components/Icons'
import { siteConfig } from '../data/siteConfig'

const ContactPage = () => (
  <div className="page">
    <div className="container">
      <Breadcrumbs items={[{ label: 'Aloqa' }]} />
      <div className="page-head">
        <div>
          <h1>Biz bilan bog'laning</h1>
          <p className="muted">Savollar, takliflar yoki buyurtma bo'yicha yordam kerakmi? Yozing yoki qo'ng'iroq qiling.</p>
        </div>
      </div>

      <div className="contact-grid">
        <div className="contact-card card">
          <span className="contact-card__icon"><Icon name="phone" size={22} /></span>
          <h3>Telefon</h3>
          <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}>{siteConfig.contact.phone}</a>
          <a href={`tel:${siteConfig.contact.phone2.replace(/\s/g, '')}`}>{siteConfig.contact.phone2}</a>
          <span className="muted">{siteConfig.contact.workingHours}</span>
        </div>

        <div className="contact-card card">
          <span className="contact-card__icon"><Icon name="mail" size={22} /></span>
          <h3>Elektron pochta</h3>
          <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
          <span className="muted">Yozma murojaatlarga 1 ish kuni ichida javob beramiz.</span>
        </div>

        <div className="contact-card card">
          <span className="contact-card__icon"><Icon name="mapPin" size={22} /></span>
          <h3>Manzil</h3>
          <span>{siteConfig.contact.address}</span>
          <span className="muted">Toshkent shahri bo'ylab yetkazib berish mavjud.</span>
        </div>

        <div className="contact-card card">
          <span className="contact-card__icon"><Icon name="telegram" size={22} /></span>
          <h3>Ijtimoiy tarmoqlar</h3>
          <div className="contact-socials">
            {siteConfig.social.map((item) => (
              <a key={item.id} href={item.href} target="_blank" rel="noreferrer" className="contact-social">
                <Icon name={item.icon} size={17} /> {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="contact-panel">
        <div className="contact-panel__content">
          <span className="eyebrow eyebrow--light">Buyurtma va yetkazish</span>
          <h2>Har kuni 08:00 — 22:00</h2>
          <p>
            Buyurtmalarni sayt orqali yoki telefon orqali qabul qilamiz. {siteConfig.delivery.freeLabel}.
            Toshkent shahri bo'ylab o'rtacha yetkazib berish vaqti — 2 soat.
          </p>
          <div className="promo__actions">
            <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`} className="btn btn--accent">
              <Icon name="phone" size={17} /> Qo'ng'iroq qilish
            </a>
            <a href={siteConfig.contact.telegram} target="_blank" rel="noreferrer" className="btn btn--outline">
              <Icon name="telegram" size={17} /> Telegram
            </a>
          </div>
        </div>
        <div className="contact-map" aria-label="Xarita o'rni">
          <span className="contact-map__pin"><Icon name="mapPin" size={34} /></span>
          <span>{siteConfig.contact.address}</span>
        </div>
      </div>

      <div className="notice">
        <Icon name="sparkles" size={17} />
        <span>{siteConfig.demoNotice}</span>
      </div>
    </div>
  </div>
)

export default ContactPage
