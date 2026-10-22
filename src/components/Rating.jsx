import Icon from './Icons'

const Rating = ({ value = 0, reviews, size = 14, showValue = true }) => (
  <span className="rating" aria-label={`Reyting ${value} / 5`}>
    <span className="rating__stars">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className={`rating__star${value >= star - 0.5 ? ' is-on' : ''}`}>
          <Icon name="star" size={size} filled={value >= star - 0.5} strokeWidth={1.5} />
        </span>
      ))}
    </span>
    {showValue && <span className="rating__value">{value}</span>}
    {typeof reviews === 'number' && reviews > 0 && <span className="rating__reviews">({reviews})</span>}
  </span>
)

export default Rating
