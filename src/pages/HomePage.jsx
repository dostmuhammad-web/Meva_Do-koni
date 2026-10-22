import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Icon from '../components/Icons'
import SectionHead from '../components/SectionHead'
import CategoryCard from '../components/CategoryCard'
import ProductCard from '../components/ProductCard'
import { categoryGroups } from '../data/categories'
import { products, getPopularProducts, getNewProducts, getDiscountedProducts } from '../data/products'
import { siteConfig } from '../data/siteConfig'
import { getProductImage } from '../utils/productImage'
import { formatPrice } from '../utils/format'

const features = [
  {
    icon: 'leaf',
    title: 'Har kuni yangi',
    text: 'Mahsulotlar har kuni fermer xo\'jaliklaridan yangi holda keltiriladi.'
  },
  {
    icon: 'truck',
    title: 'Tez yetkazib berish',
    text: `${siteConfig.delivery.freeLabel}. Toshkent bo'ylab 2 soat ichida.`
  },
  {
    icon: 'shield',
    title: 'Sifat kafolati',
    text: 'Sifatsiz mahsulot bo\'lsa, uni almashtirib beramiz yoki pulini qaytaramiz.'
  },
  {
    icon: 'clock',
    title: 'Qulay buyurtma',
    text: 'Har kuni 08:00 dan 22:00 gacha buyurtmalarni qabul qilamiz.'
  }
]

const categoryCounts = products.reduce((acc, product) => {
  acc[product.category] = (acc[product.category] || 0) + 1
  return acc
}, {})

const HomePage = () => {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const popular = getPopularProducts().slice(0, 8)
  const fresh = getNewProducts().slice(0, 4)
  const discounted = getDiscountedProducts().slice(0, 4)

  const submitSearch = (event) => {
    event.preventDefault()
    const value = query.trim()
    navigate(value ? `/katalog?q=${encodeURIComponent(value)}` : '/katalog')
  }

  return (
    <>
      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__content animate-in">
            <span className="hero__eyebrow">
              <Icon name="sparkles" size={16} /> Yangi mavsum mahsulotlari
            </span>
            <h1>
              Yangi va tabiiy <span>meva-sabzavot</span> — uyingizgacha
            </h1>
            <p className="hero__text">
              {siteConfig.brand.name} — fermadan to'g'ridan-to'g'ri yetkazib beriladigan yangi mevalar,
              sabzavotlar, quruq mevalar va yong'oqlar.
            </p>

            <form className="hero__search" onSubmit={submitSearch} role="search">
              <Icon name="search" size={20} className="search__icon" />
              <input
                type="search"
                placeholder="Nima qidiryapsiz? Masalan, olma..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                aria-label="Mahsulot qidirish"
              />
              <button type="submit" className="btn btn--primary">Qidirish</button>
            </form>

            <div className="hero__stats">
              <div className="hero__stat">
                <strong>{products.length}+</strong>
                <span>mahsulot turi</span>
              </div>
              <div className="hero__stat">
                <strong>38</strong>
                <span>kategoriya</span>
              </div>
              <div className="hero__stat">
                <strong>2 soat</strong>
                <span>yetkazib berish</span>
              </div>
            </div>
          </div>

          <div className="hero__visual only-desktop">
            <span className="hero__blob" />
            <div className="hero__image hero__image--main">
              <img src={getProductImage('olma-1')} alt="Olma" />
            </div>
            <div className="hero__image hero__image--one">
              <img src={getProductImage('qulupnay-1')} alt="Qulupnay" />
            </div>
            <div className="hero__image hero__image--two">
              <img src={getProductImage('tarvuz-1')} alt="Tarvuz" />
            </div>
            <div className="hero__chip hero__chip--delivery">
              <span className="hero__chip-icon"><Icon name="truck" size={18} /></span>
              <span>
                <strong>Bepul yetkazish</strong>
                <small>{formatPrice(siteConfig.delivery.freeFrom)} dan</small>
              </span>
            </div>
            <div className="hero__chip hero__chip--fresh">
              <span className="hero__chip-icon"><Icon name="leaf" size={18} /></span>
              <span>
                <strong>100% tabiiy</strong>
                <small>Fermadan yangi</small>
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <div className="features">
            {features.map((feature) => (
              <div key={feature.title} className="feature">
                <span className="feature__icon"><Icon name={feature.icon} size={22} /></span>
                <div>
                  <h3 className="feature__title">{feature.title}</h3>
                  <p className="feature__text">{feature.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {categoryGroups.map((group) => (
        <section key={group.id} className="section">
          <div className="container">
            <SectionHead
              eyebrow={`${group.icon} ${group.title}`}
              title={`${group.title} kategoriyalari`}
              text={group.description}
              link={`/katalog?group=${group.id}`}
            />
            <div className="category-grid">
              {group.categories.slice(0, 8).map((category) => (
                <CategoryCard key={category.slug} category={category} count={categoryCounts[category.slug] || 0} />
              ))}
            </div>
            {group.categories.length > 8 && (
              <div className="section-more">
                <Link to={`/katalog?group=${group.id}`} className="btn btn--outline">
                  {group.title} bo'limini ko'rish
                  <Icon name="arrowRight" size={16} />
                </Link>
              </div>
            )}
          </div>
        </section>
      ))}

      <section className="section section--soft">
        <div className="container">
          <SectionHead
            eyebrow="Mashhur tanlov"
            title="Eng ko'p sotilayotgan mahsulotlar"
            text="Mijozlarimiz eng ko'p tanlaydigan yangi va mazali mahsulotlar."
            link="/katalog"
            linkLabel="Katalogga o'tish"
          />
          <div className="product-grid">
            {popular.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container promo">
          <div className="promo__content">
            <span className="eyebrow eyebrow--light">Yetkazib berish</span>
            <h2>{siteConfig.delivery.freeLabel}</h2>
            <p>
              Har kuni 08:00 — 22:00 oralig'ida buyurtma qabul qilamiz. Toshkent shahri bo'ylab
              o'rtacha yetkazib berish vaqti — 2 soat.
            </p>
            <div className="promo__actions">
              <Link to="/katalog" className="btn btn--accent">Xarid qilish</Link>
              <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`} className="btn btn--outline promo__call">
                <Icon name="phone" size={17} /> {siteConfig.contact.phone}
              </a>
            </div>
          </div>
          <div className="promo__media">
            <img src={getProductImage('banan-1')} alt="Banan" />
            <img src={getProductImage('apelsin-1')} alt="Apelsin" />
            <img src={getProductImage('uzum-1')} alt="Uzum" />
          </div>
        </div>
      </section>

      {fresh.length > 0 && (
        <section className="section section--soft">
          <div className="container">
            <SectionHead
              eyebrow="Yangi keldi"
              title="Yangi mahsulotlar"
              text="Assortimentga yangi qo'shilgan mahsulotlar bilan tanishing."
              link="/katalog?sort=new"
            />
            <div className="product-grid">
              {fresh.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Chegirmalar"
            title="Chegirmadagi mahsulotlar"
            text="Bu hafta eng yaxshi narxlarda xarid qiling."
            link="/katalog?sort=discount"
          />
          <div className="product-grid">
            {discounted.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <div className="about-strip">
            <div className="about-strip__content">
              <span className="eyebrow">Biz haqimizda</span>
              <h2>Fermadan dasturxoningizgacha — bitta yo'l</h2>
              <p>
                Biz O'zbekistonning eng yaxshi fermer xo'jaliklari bilan ishlaymiz. Har bir mahsulot
                sifat nazoratidan o'tadi va faqat yangi holatda yetkazib beriladi.
              </p>
              <Link to="/aloqa" className="btn btn--dark">
                Bog'lanish
                <Icon name="arrowRight" size={17} />
              </Link>
            </div>
            <div className="about-strip__stats">
              <div className="about-strip__stat">
                <strong>12 000+</strong>
                <span>mamnun mijoz</span>
              </div>
              <div className="about-strip__stat">
                <strong>38</strong>
                <span>kategoriya</span>
              </div>
              <div className="about-strip__stat">
                <strong>{products.length}+</strong>
                <span>mahsulot</span>
              </div>
              <div className="about-strip__stat">
                <strong>4.8</strong>
                <span>o'rtacha reyting</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default HomePage
