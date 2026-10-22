import { Link } from 'react-router-dom'

import Breadcrumbs from '../components/Breadcrumbs'
import Icon from '../components/Icons'
import ProductCard from '../components/ProductCard'
import { useFavorites } from '../context/FavoritesContext'
import { getProductById } from '../data/products'

const FavoritesPage = () => {
  const { favorites, clearFavorites } = useFavorites()
  const items = favorites.map((id) => getProductById(id)).filter(Boolean)

  return (
    <div className="page">
      <div className="container">
        <Breadcrumbs items={[{ label: 'Sevimlilar' }]} />
        <div className="page-head">
          <div>
            <h1>Sevimlilar</h1>
            <p className="muted">Keyinroq xarid qilish uchun saqlab qo'yilgan mahsulotlar.</p>
          </div>
          {items.length > 0 && (
            <button type="button" className="btn btn--ghost btn--sm" onClick={clearFavorites}>
              <Icon name="trash" size={16} /> Barchasini olib tashlash
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="empty card">
            <span className="empty__icon"><Icon name="heart" size={38} /></span>
            <h2 className="empty__title">Sevimlilar ro'yxati bo'sh</h2>
            <p className="empty__text">
              Mahsulot kartasidagi yurak belgisini bosib, uni sevimlilarga qo'shishingiz mumkin.
            </p>
            <Link to="/katalog" className="btn btn--primary btn--lg">Katalogga o'tish</Link>
          </div>
        ) : (
          <div className="product-grid">
            {items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default FavoritesPage
