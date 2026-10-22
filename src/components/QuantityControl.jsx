import Icon from './Icons'
import { formatDecimal } from '../utils/format'

const QuantityControl = ({ value, step = 1, onChange, min, max = 99, size = 'md' }) => {
  const minimum = min ?? step
  const decrease = () => onChange(Math.max(minimum, Math.round((value - step) * 1000) / 1000))
  const increase = () => onChange(Math.min(max, Math.round((value + step) * 1000) / 1000))

  return (
    <div className={`qty qty--${size}`}>
      <button
        type="button"
        className="qty__btn"
        onClick={decrease}
        disabled={value <= minimum}
        aria-label="Kamaytirish"
      >
        <Icon name="minus" size={16} />
      </button>
      <span className="qty__value">{formatDecimal(value)}</span>
      <button type="button" className="qty__btn" onClick={increase} disabled={value >= max} aria-label="Ko'paytirish">
        <Icon name="plus" size={16} />
      </button>
    </div>
  )
}

export default QuantityControl
