import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'

import Icon from './Icons'
import { LOGO_IMAGE } from '../utils/productImage'
import { useCart } from '../context/CartContext'
import { useFavorites } from '../context/FavoritesContext'
import { siteConfig } from '../data/siteConfig'
import { formatPrice } from '../utils/format'

const links = [
  { to: '/', label: 'Bosh sahifa', end: true },
  { to: '/katalog', label: 'Katalog' },
  { to: '/sevimlilar', label: 'Sevimlilar' },
  { to: '/aloqa', label: 'Aloqa' }
]

const Header = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { count, total } = useCart()
  const favorites = useFavorites()
  const [query, setQuery] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname, location.search])

  useEffect(() => {
    document.body.classList.toggle('no-scroll', menuOpen)
    return () => document.body.classList.remove('no-scroll')
  }, [menuOpen])

  const submitSearch = (event) => {
    event.preventDefault()
    const value = query.trim()
    navigate(value ? `/katalog?q=${encodeURIComponent(value)}` : '/katalog')
    setMenuOpen(false)
  }

  return (
    <header className="site-header">
      <div className="topbar">
        <div className="container topbar__inner">
          <a className="topbar__item" href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}>
            <Icon name="phone" size={14} />
            {siteConfig.contact.phone}
          </a>
          <span className="topbar__item topbar__item--hide">
            <Icon name="truck" size={15} />
            {siteConfig.delivery.freeLabel}
          </span>
          <span className="topbar__item">
            <Icon name="clock" size={14} />
            {siteConfig.contact.workingHours}
          </span>
        </div>
      </div>

      <div className="header">
        <div className="container header__inner">
          <Link to="/" className="brand" aria-label={siteConfig.brand.name}>
            <img src={LOGO_IMAGE} alt="" className="brand__logo" width="46" height="46" />
            <span className="brand__text">
              <span className="brand__name">{siteConfig.brand.name}</span>
              <span className="brand__tagline">{siteConfig.brand.tagline}</span>
            </span>
          </Link>

          <nav className="nav only-desktop" aria-label="Asosiy menyu">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) => `nav__link${isActive ? ' is-active' : ''}`}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <form className="search only-desktop" onSubmit={submitSearch} role="search">
            <Icon name="search" size={18} className="search__icon" />
            <input
              type="search"
              className="search__input"
              placeholder="Mahsulot qidirish..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              aria-label="Mahsulot qidirish"
            />
            <button type="submit" className="search__button" aria-label="Qidirish">
              <Icon name="search" size={16} />
            </button>
          </form>

          <div className="header__actions">
            <Link to="/sevimlilar" className="icon-btn" aria-label="Sevimlilar">
              <Icon name="heart" size={21} />
              {favorites.count > 0 && <span className="icon-btn__badge">{favorites.count}</span>}
            </Link>
            <Link to="/savatcha" className="cart-btn" aria-label="Savatcha">
              <Icon name="cart" size={21} />
              <span className="cart-btn__info">
                <span className="cart-btn__label">Savatcha</span>
                <span className="cart-btn__value">{formatPrice(total)}</span>
              </span>
              {count > 0 && <span className="icon-btn__badge">{count}</span>}
            </Link>
            <button
              type="button"
              className="icon-btn only-mobile"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Menyu"
              aria-expanded={menuOpen}
            >
              <Icon name={menuOpen ? 'close' : 'menu'} size={22} />
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="mobile-menu">
          <form className="mobile-menu__search" onSubmit={submitSearch} role="search">
            <input
              type="search"
              className="input"
              placeholder="Mahsulot qidirish..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              aria-label="Mahsulot qidirish"
            />
            <button type="submit" className="btn btn--primary" aria-label="Qidirish">
              <Icon name="search" size={18} />
            </button>
          </form>
          <nav className="mobile-menu__nav" aria-label="Mobil menyu">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) => `mobile-menu__link${isActive ? ' is-active' : ''}`}
              >
                {link.label}
                <Icon name="chevron" size={17} />
              </NavLink>
            ))}
          </nav>
          <div className="mobile-menu__footer">
            <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`} className="mobile-menu__phone">
              <Icon name="phone" size={17} /> {siteConfig.contact.phone}
            </a>
            <span className="muted">{siteConfig.contact.workingHours}</span>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
