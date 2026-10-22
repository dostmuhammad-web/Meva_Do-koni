import { Link } from 'react-router-dom'

import { getProductImage } from '../utils/productImage'

const CategoryCard = ({ category, count }) => (
  <Link to={`/katalog?cat=${category.slug}`} className="category-card">
    <span className="category-card__media">
      <img src={getProductImage(category.image)} alt={category.name} loading="lazy" />
    </span>
    <span className="category-card__body">
      <span className="category-card__name">{category.name}</span>
      <span className="category-card__meta">{count} ta mahsulot</span>
    </span>
  </Link>
)

export default CategoryCard
