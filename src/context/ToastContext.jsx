import { createContext, useCallback, useContext, useMemo, useState } from 'react'

const ToastContext = createContext(null)

let toastCounter = 0

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const showToast = useCallback(
    (message, type = 'success') => {
      toastCounter += 1
      const id = toastCounter
      setToasts((prev) => [...prev.slice(-3), { id, message, type }])
      window.setTimeout(() => removeToast(id), 3200)
      return id
    },
    [removeToast]
  )

  const value = useMemo(() => ({ toasts, showToast, removeToast }), [toasts, showToast, removeToast])

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
}

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) throw new Error('useToast faqat ToastProvider ichida ishlatilishi mumkin')
  return context
}
