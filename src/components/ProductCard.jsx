import { Link } from 'react-router-dom'

import Icon from './Icons'
import Rating from './Rating'
import { getProductImage } from '../utils/productImage'
import { formatPrice, formatQuantity } from '../utils/format'
import { useCart } from '../context/CartContext'
import { useFavorites } from '../context/FavoritesContext'
import { useToast } from '../context/ToastContext'
import { categoriesBySlug } from '../data/categories'

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()
  const { isFavorite, toggleFavorite } = useFavorites()
  const { showToast } = useToast()
  const category = categoriesBySlug[product.category]
  const favorite = isFavorite(product.id)

  const handleAdd = () => {
    addToCart(product, product.step)
    showToast(`${product.name} savatchaga qo'shildi`)
  }

  const handleFavorite = () => {
    const added = toggleFavorite(product.id)
    showToast(added ? 'Sevimlilarga qo\'shildi' : 'Sevimlilardan olib tashlandi', added ? 'success' : 'info')
  }

  return (
    <article className="product-card">
      <div className="product-card__media">
        <Link to={`/mahsulot/${product.id}`} aria-label={product.name}>
          <img src={getProductImage(product.image)} alt={product.name} loading="lazy" />
        </Link>
        <div className="product-card__badges">
          {product.discount > 0 && <span className="badge badge--sale">-{product.discount}%</span>}
          {product.isNew && <span className="badge badge--new">Yangi</span>}
          {product.popular && !product.discount && <span className="badge badge--popular">Top</span>}
        </div>
        <button
          type="button"
          className={`favorite-btn${favorite ? ' is-active' : ''}`}
          onClick={handleFavorite}
          aria-label={favorite ? 'Sevimlilardan olib tashlash' : 'Sevimlilarga qo\'shish'}
          aria-pressed={favorite}
        >
          <Icon name="heart" size={18} filled={favorite} />
        </button>
      </div>

      <div className="product-card__body">
        <Link to={`/katalog?cat=${product.category}`} className="product-card__category">
          {category ? category.name : product.category}
        </Link>
        <h3 className="product-card__name">
          <Link to={`/mahsulot/${product.id}`}>{product.name}</Link>
        </h3>
        <div className="product-card__meta">
          <Rating value={product.rating} reviews={product.reviews} size={13} />
          <span className="product-card__unit">{formatQuantity(1, product.unit)}</span>
        </div>
        <div className="product-card__footer">
          <div className="product-card__prices">
            <span className="price">{formatPrice(product.price)}</span>
            {product.oldPrice && <span className="price price--old">{formatPrice(product.oldPrice)}</span>}
          </div>
          <button type="button" className="add-btn" onClick={handleAdd} aria-label="Savatchaga qo'shish">
            <Icon name="cart" size={18} />
            <span>Qo'shish</span>
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
