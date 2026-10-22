import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Breadcrumbs from '../components/Breadcrumbs'
import Icon from '../components/Icons'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'
import { getProductImage } from '../utils/productImage'
import { formatPrice, formatQuantity } from '../utils/format'
import { emptyOrderForm, generateOrderNumber, regionOptions, validateOrderForm, formatOrderDate } from '../utils/validation'
import { readStorage, writeStorage, STORAGE_KEYS } from '../utils/storage'
import { siteConfig } from '../data/siteConfig'

const CheckoutPage = () => {
  const { items, subtotal, savings, delivery, deliveryFree, total, clearCart } = useCart()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const [values, setValues] = useState(emptyOrderForm)
  const [errors, setErrors] = useState({})
  const [order, setOrder] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = validateOrderForm(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      showToast('Iltimos, formadagi xatolarni tuzating', 'error')
      return
    }

    setSubmitting(true)
    const newOrder = {
      number: generateOrderNumber(),
      date: new Date().toISOString(),
      customer: { ...values },
      items: items.map((item) => ({
        id: item.product.id,
        name: item.product.name,
        qty: item.qty,
        unit: item.unit,
        price: item.product.price,
        lineTotal: item.lineTotal
      })),
      subtotal,
      savings,
      delivery,
      total
    }
    const orders = readStorage(STORAGE_KEYS.orders, [])
    writeStorage(STORAGE_KEYS.orders, [newOrder, ...(Array.isArray(orders) ? orders : [])])
    clearCart()
    setOrder(newOrder)
    setSubmitting(false)
    showToast('Buyurtma qabul qilindi')
  }

  if (order) {
    return (
      <div className="page">
        <div className="container">
          <Breadcrumbs items={[{ label: 'Buyurtma' }]} />
          <div className="order-success card">
            <span className="order-success__icon"><Icon name="check" size={40} /></span>
            <h1>Buyurtma qabul qilindi!</h1>
            <p className="muted">
              Rahmat, {order.customer.name.split(' ')[0]}! Buyurtma raqamingiz:
              <strong className="order-success__number"> {order.number}</strong>
            </p>
            <ul className="order-success__info">
              <li><span>Sana</span><strong>{formatOrderDate(order.date)}</strong></li>
              <li><span>Telefon</span><strong>{order.customer.phone}</strong></li>
              <li><span>Manzil</span><strong>{order.customer.region}, {order.customer.address}</strong></li>
              <li><span>Mahsulotlar</span><strong>{order.items.length} xil</strong></li>
              <li><span>Jami</span><strong>{formatPrice(order.total)}</strong></li>
              <li><span>Yetkazib berish</span><strong>{order.delivery === 0 ? 'Bepul' : formatPrice(order.delivery)}</strong></li>
            </ul>
            <div className="order-success__items">
              {order.items.map((item) => (
                <div key={item.id} className="order-success__item">
                  <span>{item.name}</span>
                  <span>{formatQuantity(item.qty, item.unit)}</span>
                  <strong>{formatPrice(item.lineTotal)}</strong>
                </div>
              ))}
            </div>
            <div className="notice">
              <Icon name="sparkles" size={17} />
              <span>{siteConfig.demoNotice}</span>
            </div>
            <div className="order-success__actions">
              <Link to="/katalog" className="btn btn--primary">Xaridni davom ettirish</Link>
              <Link to="/" className="btn btn--outline">Bosh sahifa</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="page">
        <div className="container">
          <Breadcrumbs items={[{ label: 'Buyurtma' }]} />
          <div className="empty card">
            <span className="empty__icon"><Icon name="cart" size={38} /></span>
            <h1 className="empty__title">Savatcha bo'sh</h1>
            <p className="empty__text">Buyurtma berish uchun avval savatchaga mahsulot qo'shing.</p>
            <button type="button" className="btn btn--primary" onClick={() => navigate('/katalog')}>
              Katalogga o'tish
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <div className="container">
        <Breadcrumbs items={[{ label: 'Savatcha', to: '/savatcha' }, { label: 'Buyurtma' }]} />
        <div className="page-head">
          <div>
            <h1>Buyurtma berish</h1>
            <p className="muted">Ma'lumotlaringizni to'ldiring — qolganini biz bajaramiz.</p>
          </div>
        </div>

        <form className="checkout-layout" onSubmit={handleSubmit} noValidate>
          <div className="checkout-form card">
            <h2 className="summary__title">Yetkazib berish ma'lumotlari</h2>

            <div className="form-grid">
              <div className="field">
                <label className="field__label" htmlFor="name">Ism va familiya *</label>
                <input
                  id="name"
                  name="name"
                  className={`input${errors.name ? ' input--error' : ''}`}
                  placeholder="Masalan, Aziz Karimov"
                  value={values.name}
                  onChange={handleChange}
                  autoComplete="name"
                />
                {errors.name && <span className="field__error">{errors.name}</span>}
              </div>

              <div className="field">
                <label className="field__label" htmlFor="phone">Telefon raqam *</label>
                <input
                  id="phone"
                  name="phone"
                  className={`input${errors.phone ? ' input--error' : ''}`}
                  placeholder="+998 90 123 45 67"
                  value={values.phone}
                  onChange={handleChange}
                  inputMode="tel"
                  autoComplete="tel"
                />
                {errors.phone ? (
                  <span className="field__error">{errors.phone}</span>
                ) : (
                  <span className="field__hint">+998 XX XXX XX XX ko'rinishida</span>
                )}
              </div>

              <div className="field">
                <label className="field__label" htmlFor="region">Viloyat / shahar *</label>
                <select
                  id="region"
                  name="region"
                  className={`select${errors.region ? ' select--error' : ''}`}
                  value={values.region}
                  onChange={handleChange}
                >
                  <option value="">Tanlang...</option>
                  {regionOptions.map((region) => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
                {errors.region && <span className="field__error">{errors.region}</span>}
              </div>

              <div className="field">
                <label className="field__label" htmlFor="address">Manzil *</label>
                <input
                  id="address"
                  name="address"
                  className={`input${errors.address ? ' input--error' : ''}`}
                  placeholder="Ko'cha, uy, xonadon"
                  value={values.address}
                  onChange={handleChange}
                  autoComplete="street-address"
                />
                {errors.address && <span className="field__error">{errors.address}</span>}
              </div>

              <div className="field form-grid__full">
                <label className="field__label" htmlFor="note">Izoh</label>
                <textarea
                  id="note"
                  name="note"
                  className="textarea"
                  placeholder="Qo'shimcha izoh yoki yetkazib berish bo'yicha istaklar"
                  value={values.note}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="notice">
              <Icon name="shield" size={17} />
              <span>Bu demo loyiha — ma'lumotlar faqat brauzeringizda saqlanadi.</span>
            </div>

            <button type="submit" className="btn btn--primary btn--lg btn--block" disabled={submitting}>
              Buyurtmani tasdiqlash
            </button>
          </div>

          <aside className="summary card">
            <h2 className="summary__title">Buyurtmangiz</h2>
            <ul className="summary-items">
              {items.map((item) => (
                <li key={item.product.id} className="summary-item">
                  <span className="summary-item__media">
                    <img src={getProductImage(item.product.image)} alt="" />
                  </span>
                  <span className="summary-item__info">
                    <strong>{item.product.name}</strong>
                    <span className="muted">{formatQuantity(item.qty, item.unit)}</span>
                  </span>
                  <strong>{formatPrice(item.lineTotal)}</strong>
                </li>
              ))}
            </ul>
            <ul className="summary__list">
              <li><span>Mahsulotlar</span><strong>{formatPrice(subtotal)}</strong></li>
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
            <Link to="/savatcha" className="btn btn--ghost btn--block">
              <Icon name="arrowLeft" size={16} /> Savatchaga qaytish
            </Link>
          </aside>
        </form>
      </div>
    </div>
  )
}

export default CheckoutPage
