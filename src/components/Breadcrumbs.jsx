import { Link } from 'react-router-dom'

const Breadcrumbs = ({ items = [] }) => (
  <nav className="breadcrumbs" aria-label="Navigatsiya">
    <Link to="/">Bosh sahifa</Link>
    {items.map((item, index) => (
      <span key={`${item.label}-${index}`} className="breadcrumbs__item">
        <span className="breadcrumbs__sep">/</span>
        {item.to ? <Link to={item.to}>{item.label}</Link> : <span>{item.label}</span>}
      </span>
    ))}
  </nav>
)

export default Breadcrumbs
