import { useToast } from '../context/ToastContext'
import Icon from './Icons'

const Toasts = () => {
  const { toasts, removeToast } = useToast()

  if (!toasts.length) return null

  return (
    <div className="toasts" role="status" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast toast--${toast.type}`}>
          <span className="toast__icon">
            <Icon name={toast.type === 'error' ? 'close' : 'check'} size={16} />
          </span>
          <span className="toast__text">{toast.message}</span>
          <button type="button" className="toast__close" onClick={() => removeToast(toast.id)} aria-label="Yopish">
            <Icon name="close" size={15} />
          </button>
        </div>
      ))}
    </div>
  )
}

export default Toasts
