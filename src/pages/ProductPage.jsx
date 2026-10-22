import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import Breadcrumbs from '../components/Breadcrumbs'
import Icon from '../components/Icons'
import Rating from '../components/Rating'
import QuantityControl from '../components/QuantityControl'
import ProductCard from '../components/ProductCard'
import { categoriesBySlug } from '../data/categories'
import { getProductById, getRelatedProducts } from '../data/products'
import { siteConfig } from '../data/siteConfig'
import { availableImages, getProductImage } from '../utils/productImage'
import { formatPrice, formatQuantity } from '../utils/format'
import { useCart } from '../context/CartContext'
import { useFavorites } from '../context/FavoritesContext'
import { useToast } from '../context/ToastContext'

const getVariants = (imageKey) => {
  const base = imageKey.replace(/-\d+$/, '')
  const variants = [1, 2, 3].map((index) => `${base}-${index}`).filter((key) => availableImages.includes(key))
  return variants.length ? variants : [imageKey]
}

const ProductPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = getProductById(id)
  const { addToCart } = useCart()
  const { isFavorite, toggleFavorite } = useFavorites()
  const { showToast } = useToast()
  const [qty, setQty] = useState(product?.step || 1)
  const [activeImage, setActiveImage] = useState(product?.image)

  useEffect(() => {
    setQty(product?.step || 1)
    setActiveImage(product?.image)
  }, [product])

  if (!product) {
    return (
      <div className="page">
        <div className="container">
          <div className="empty card">
            <span className="empty__icon"><Icon name="package" size={36} /></span>
            <h1 className="empty__title">Mahsulot topilmadi</h1>
            <p className="empty__text">Bu mahsulot katalogdan olib tashlangan yoki havola xato.</p>
            <Link to="/katalog" className="btn btn--primary">Katalogga qaytish</Link>
          </div>
        </div>
      </div>
    )
  }

  const category = categoriesBySlug[product.category]
  const variants = getVariants(product.image)
  const favorite = isFavorite(product.id)
  const related = getRelatedProducts(product, 4)
  const savings = product.oldPrice ? (product.oldPrice - product.price) * qty : 0

  const handleAdd = () => {
    addToCart(product, qty)
    showToast(`${product.name} (${formatQuantity(qty, product.unit)}) savatchaga qo'shildi`)
  }

  const handleBuy = () => {
    addToCart(product, qty)
    navigate('/buyurtma')
  }

  const handleFavorite = () => {
    const added = toggleFavorite(product.id)
    showToast(added ? 'Sevimlilarga qo\'shildi' : 'Sevimlilardan olib tashlandi', added ? 'success' : 'info')
  }

  return (
    <div className="page">
      <div className="container">
        <Breadcrumbs
          items={[
            { label: 'Katalog', to: '/katalog' },
            ...(category ? [{ label: category.name, to: `/katalog?cat=${category.slug}` }] : []),
            { label: product.name }
          ]}
        />

        <div className="product-detail">
          <div className="product-detail__gallery">
            <div className="product-detail__main">
              <img src={getProductImage(activeImage || product.image)} alt={product.name} />
              <div className="product-detail__badges">
                {product.discount > 0 && <span className="badge badge--sale">-{product.discount}%</span>}
                {product.isNew && <span className="badge badge--new">Yangi</span>}
                {product.popular && <span className="badge badge--popular">Mashhur</span>}
              </div>
              <button
                type="button"
                className={`favorite-btn favorite-btn--lg${favorite ? ' is-active' : ''}`}
                onClick={handleFavorite}
                aria-label={favorite ? 'Sevimlilardan olib tashlash' : 'Sevimlilarga qo\'shish'}
                aria-pressed={favorite}
              >
                <Icon name="heart" size={21} filled={favorite} />
              </button>
            </div>
            {variants.length > 1 && (
              <div className="product-detail__thumbs">
                {variants.map((key) => (
                  <button
                    key={key}
                    type="button"
                    className={`thumb${activeImage === key ? ' is-active' : ''}`}
                    onClick={() => setActiveImage(key)}
                    aria-label={`Rasm ${key}`}
                  >
                    <img src={getProductImage(key)} alt="" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="product-detail__info">
            {category && (
              <Link to={`/katalog?cat=${category.slug}`} className="eyebrow">{category.name}</Link>
            )}
            <h1>{product.name}</h1>
            <div className="product-detail__meta">
              <Rating value={product.rating} reviews={product.reviews} size={16} />
              <span className="product-detail__stock">
                {product.inStock && product.stock > 0 ? (
                  <><Icon name="check" size={15} /> Omborda mavjud</>
                ) : (
                  'Omborda yo\'q'
                )}
              </span>
            </div>

            <p className="product-detail__desc">{product.description}</p>

            <ul className="info-list">
              <li><span>Ishlab chiqaruvchi</span><strong>{product.origin}</strong></li>
              <li><span>O'lchov birligi</span><strong>{product.unit}</strong></li>
              <li><span>Kategoriya</span><strong>{category ? category.name : product.category}</strong></li>
              <li><span>Ombordagi miqdor</span><strong>{product.stock} dona</strong></li>
            </ul>

            <div className="buybox">
              <div className="buybox__prices">
                <span className="price price--lg">{formatPrice(product.price)}</span>
                {product.oldPrice && <span className="price price--old">{formatPrice(product.oldPrice)}</span>}
                {product.discount > 0 && <span className="badge badge--sale">-{product.discount}%</span>}
              </div>
              <p className="buybox__unit muted">
                {formatQuantity(1, product.unit)} uchun narx
                {savings > 0 && <> · Tejaysiz: <strong>{formatPrice(savings)}</strong></>}
              </p>

              <div className="buybox__row">
                <div className="buybox__qty">
                  <span className="field__label">Miqdor</span>
                  <QuantityControl
                    value={qty}
                    step={product.step}
                    min={product.step}
                    max={Math.max(product.step, product.stock)}
                    onChange={setQty}
                    size="lg"
                  />
                </div>
                <div className="buybox__total">
                  <span className="field__label">Jami</span>
                  <strong>{formatPrice(product.price * qty)}</strong>
                </div>
              </div>

              <div className="buybox__actions">
                <button type="button" className="btn btn--primary btn--lg" onClick={handleAdd}>
                  <Icon name="cart" size={19} /> Savatchaga qo'shish
                </button>
                <button type="button" className="btn btn--dark btn--lg" onClick={handleBuy}>
                  Sotib olish
                </button>
              </div>
            </div>

            <div className="perks">
              <div className="perk">
                <Icon name="truck" size={19} />
                <div>
                  <strong>Yetkazib berish</strong>
                  <span>{siteConfig.delivery.freeLabel}</span>
                </div>
              </div>
              <div className="perk">
                <Icon name="shield" size={19} />
                <div>
                  <strong>Sifat kafolati</strong>
                  <span>Sifatsiz mahsulotni almashtiramiz</span>
                </div>
              </div>
              <div className="perk">
                <Icon name="clock" size={19} />
                <div>
                  <strong>Tez yetkazish</strong>
                  <span>Toshkent bo'ylab 2 soat ichida</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="notice">
          <Icon name="sparkles" size={17} />
          <span>{siteConfig.demoNotice}</span>
        </div>

        {related.length > 0 && (
          <section className="section">
            <div className="section-head">
              <div>
                <span className="eyebrow">O'xshash mahsulotlar</span>
                <h2>Buni ham tanlashingiz mumkin</h2>
              </div>
              {category && (
                <Link to={`/katalog?cat=${category.slug}`} className="btn btn--outline btn--sm">
                  Barchasi <Icon name="arrowRight" size={16} />
                </Link>
              )}
            </div>
            <div className="product-grid">
              {related.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

export default ProductPage
