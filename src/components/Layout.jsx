import { Outlet } from 'react-router-dom'

import Header from './Header'
import Footer from './Footer'
import Toasts from './Toasts'
import { useScrollToTop } from '../hooks/useScrollToTop'

const Layout = () => {
  useScrollToTop()

  return (
    <div className="app-shell">
      <Header />
      <main className="app-main">
        <Outlet />
      </main>
      <Footer />
      <Toasts />
    </div>
  )
}

export default Layout
