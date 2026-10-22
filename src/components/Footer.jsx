import { Link } from 'react-router-dom'

import Icon from './Icons'
import { LOGO_IMAGE } from '../utils/productImage'
import { siteConfig } from '../data/siteConfig'
import { allCategories } from '../data/categories'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <Link to="/" className="brand brand--footer">
            <img src={LOGO_IMAGE} alt="" className="brand__logo" width="46" height="46" />
            <span className="brand__text">
              <span className="brand__name">{siteConfig.brand.name}</span>
              <span className="brand__tagline">{siteConfig.brand.tagline}</span>
            </span>
          </Link>
          <p className="footer__text">{siteConfig.brand.description}</p>
          <div className="footer__socials">
            {siteConfig.social.map((item) => (
              <a
                key={item.id}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="footer__social"
                aria-label={item.label}
              >
                <Icon name={item.icon} size={18} />
              </a>
            ))}
          </div>
        </div>

        <div className="footer__col">
          <h4 className="footer__title">Sahifalar</h4>
          <ul className="footer__list">
            <li><Link to="/">Bosh sahifa</Link></li>
            <li><Link to="/katalog">Katalog</Link></li>
            <li><Link to="/sevimlilar">Sevimlilar</Link></li>
            <li><Link to="/savatcha">Savatcha</Link></li>
            <li><Link to="/aloqa">Aloqa</Link></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4 className="footer__title">Kategoriyalar</h4>
          <ul className="footer__list">
            {allCategories.slice(0, 7).map((category) => (
              <li key={category.slug}>
                <Link to={`/katalog?cat=${category.slug}`}>{category.name}</Link>
              </li>
            ))}
            <li><Link to="/katalog">Barchasi...</Link></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4 className="footer__title">Aloqa</h4>
          <ul className="footer__list footer__list--contact">
            <li>
              <Icon name="phone" size={16} />
              <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}>{siteConfig.contact.phone}</a>
            </li>
            <li>
              <Icon name="phone" size={16} />
              <a href={`tel:${siteConfig.contact.phone2.replace(/\s/g, '')}`}>{siteConfig.contact.phone2}</a>
            </li>
            <li>
              <Icon name="mail" size={16} />
              <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
            </li>
            <li>
              <Icon name="mapPin" size={16} />
              <span>{siteConfig.contact.address}</span>
            </li>
            <li>
              <Icon name="clock" size={16} />
              <span>{siteConfig.contact.workingHours}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="container footer__notice">
        <span>{siteConfig.demoNotice}</span>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <span>© {year} {siteConfig.brand.name}. Barcha huquqlar himoyalangan.</span>
          <span>Demo loyiha</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
