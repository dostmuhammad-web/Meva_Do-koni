import { Route, Routes } from 'react-router-dom'

import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import CatalogPage from './pages/CatalogPage'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import FavoritesPage from './pages/FavoritesPage'
import ContactPage from './pages/ContactPage'
import NotFoundPage from './pages/NotFoundPage'

const App = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="katalog" element={<CatalogPage />} />
      <Route path="mahsulot/:id" element={<ProductPage />} />
      <Route path="savatcha" element={<CartPage />} />
      <Route path="buyurtma" element={<CheckoutPage />} />
      <Route path="sevimlilar" element={<FavoritesPage />} />
      <Route path="aloqa" element={<ContactPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
)

export default App
