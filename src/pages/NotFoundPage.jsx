import { Link } from 'react-router-dom'

import Icon from '../components/Icons'

const NotFoundPage = () => (
  <div className="page">
    <div className="container">
      <div className="empty card">
        <span className="empty__icon"><Icon name="search" size={38} /></span>
        <h1 className="empty__title">Sahifa topilmadi</h1>
        <p className="empty__text">Kechirasiz, siz izlagan sahifa mavjud emas yoki ko'chirilgan.</p>
        <Link to="/" className="btn btn--primary btn--lg">Bosh sahifaga qaytish</Link>
      </div>
    </div>
  </div>
)

export default NotFoundPage
