import { Link } from 'react-router-dom'

import Icon from './Icons'

const SectionHead = ({ eyebrow, title, text, link, linkLabel = 'Barchasi' }) => (
  <div className="section-head">
    <div>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      {text && <p className="section-head__text muted">{text}</p>}
    </div>
    {link && (
      <Link to={link} className="btn btn--outline btn--sm section-head__link">
        {linkLabel}
        <Icon name="arrowRight" size={16} />
      </Link>
    )}
  </div>
)

export default SectionHead
