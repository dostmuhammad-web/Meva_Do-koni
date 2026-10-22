import { Link, useNavigate } from 'react-router-dom'

import Breadcrumbs from '../components/Breadcrumbs'
import Icon from '../components/Icons'
import QuantityControl from '../components/QuantityControl'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'
import { getProductImage } from '../utils/productImage'
import { formatPrice, formatQuantity } from '../utils/format'
import { siteConfig } from '../data/siteConfig'

const CartPage = () => {
  const {
    items,
    count,
    subtotal,
    savings,
    delivery,
    deliveryFree,
    total,
    freeFrom,
    remainingForFree,
    updateQty,
    removeFromCart,
    clearCart
  } = useCart()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const progress = Math.min(100, Math.round((subtotal / freeFrom) * 100))

  const handleRemove = (item) => {
    removeFromCart(item.product.id)
    showToast(`${item.product.name} savatchadan olib tashlandi`, 'info')
  }

  const handleClear = () => {
    clearCart()
    showToast('Savatcha tozalandi', 'info')
  }

  if (items.length === 0) {
    return (
      <div className="page">
        <div className="container">
          <Breadcrumbs items={[{ label: 'Savatcha' }]} />
          <div className="empty card">
            <span className="empty__icon"><Icon name="cart" size={38} /></span>
            <h1 className="empty__title">Savatchangiz bo'sh</h1>
            <p className="empty__text">
              Katalogdan o'zingizga yoqqan mahsulotlarni tanlab, savatchaga qo'shing.
            </p>
            <Link to="/katalog" className="btn btn--primary btn--lg">Katalogga o'tish</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <div className="container">
        <Breadcrumbs items={[{ label: 'Savatcha' }]} />
        <div className="page-head">
          <div>
            <h1>Savatcha</h1>
            <p className="muted">{count} xil mahsulot tanlandi</p>
          </div>
          <button type="button" className="btn btn--ghost btn--sm" onClick={handleClear}>
            <Icon name="trash" size={16} /> Savatchani tozalash
          </button>
        </div>

        <div className="cart-layout">
          <div className="cart-list">
            {!deliveryFree && (
              <div className="delivery-progress card">
                <div className="delivery-progress__top">
                  <span>
                    <Icon name="truck" size={17} /> Bepul yetkazish uchun
                    <strong> {formatPrice(remainingForFree)}</strong> qoldi
                  </span>
                  <span className="muted">{progress}%</span>
                </div>
                <div className="progress">
                  <span style={{ width: `${progress}%` }} />
                </div>
              </div>
            )}

            {items.map((item) => (
              <article key={item.product.id} className="cart-item card">
                <Link to={`/mahsulot/${item.product.id}`} className="cart-item__media">
                  <img src={getProductImage(item.product.image)} alt={item.product.name} />
                </Link>
                <div className="cart-item__info">
                  <Link to={`/mahsulot/${item.product.id}`} className="cart-item__name">
                    {item.product.name}
                  </Link>
                  <span className="muted cart-item__unit">
                    {formatQuantity(1, item.product.unit)} · {formatPrice(item.product.price)}
                  </span>
                  {item.product.discount > 0 && (
                    <span className="badge badge--sale">-{item.product.discount}%</span>
                  )}
                  <div className="cart-item__controls">
                    <QuantityControl
                      value={item.qty}
                      step={item.step}
                      min={item.step}
                      max={Math.max(item.step, item.product.stock)}
                      onChange={(value) => updateQty(item.product.id, value)}
                    />
                    <button
                      type="button"
                      className="link-btn link-btn--danger"
                      onClick={() => handleRemove(item)}
                    >
                      <Icon name="trash" size={15} /> Olib tashlash
                    </button>
                  </div>
                </div>
                <div className="cart-item__total">
                  <strong>{formatPrice(item.lineTotal)}</strong>
                  {item.lineSavings > 0 && (
                    <span className="cart-item__saving">-{formatPrice(item.lineSavings)}</span>
                  )}
                </div>
              </article>
            ))}
          </div>

          <aside className="summary card">
            <h2 className="summary__title">Buyurtma xulosasi</h2>
            <ul className="summary__list">
              <li><span>Mahsulotlar ({count})</span><strong>{formatPrice(subtotal)}</strong></li>
              {savings > 0 && (
                <li className="summary__saving"><span>Chegirma</span><strong>-{formatPrice(savings)}</strong></li>
              )}
              <li>
                <span>Yetkazib berish</span>
                <strong>{deliveryFree ? 'Bepul' : formatPrice(delivery)}</strong>
              </li>
            </ul>
            <div className="summary__total">
              <span>Jami</span>
              <strong>{formatPrice(total)}</strong>
            </div>
            {deliveryFree ? (
              <p className="summary__note summary__note--success">
                <Icon name="check" size={15} /> Yetkazib berish bepul
              </p>
            ) : (
              <p className="summary__note">
                {siteConfig.delivery.freeLabel}
              </p>
            )}
            <button
              type="button"
              className="btn btn--primary btn--lg btn--block"
              onClick={() => navigate('/buyurtma')}
            >
              Buyurtma berish <Icon name="arrowRight" size={18} />
            </button>
            <Link to="/katalog" className="btn btn--ghost btn--block">Xaridni davom ettirish</Link>
          </aside>
        </div>
      </div>
    </div>
  )
}

export default CartPage
