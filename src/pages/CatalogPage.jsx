import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import Breadcrumbs from '../components/Breadcrumbs'
import Icon from '../components/Icons'
import ProductCard from '../components/ProductCard'
import { allCategories, categoryGroups, categoriesBySlug } from '../data/categories'
import { products } from '../data/products'
import { popularSearches } from '../data/siteConfig'

const PAGE_SIZE = 12

const sortOptions = [
  { value: 'default', label: 'Avalgi tartibda' },
  { value: 'price-asc', label: 'Narx: arzondan qimmatga' },
  { value: 'price-desc', label: 'Narx: qimmatdan arzonga' },
  { value: 'rating', label: 'Reyting bo\'yicha' },
  { value: 'discount', label: 'Chegirma bo\'yicha' },
  { value: 'new', label: 'Yangi mahsulotlar' },
  { value: 'name', label: 'Nomi bo\'yicha (A-Z)' }
]

const countByCategory = products.reduce((acc, product) => {
  acc[product.category] = (acc[product.category] || 0) + 1
  return acc
}, {})

const CatalogPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const category = searchParams.get('cat') || ''
  const group = searchParams.get('group') || ''
  const query = searchParams.get('q') || ''
  const sort = searchParams.get('sort') || 'default'

  const [search, setSearch] = useState(query)
  const [visible, setVisible] = useState(PAGE_SIZE)

  useEffect(() => {
    setSearch(query)
  }, [query])

  useEffect(() => {
    setVisible(PAGE_SIZE)
  }, [category, group, query, sort])

  const activeGroup = category ? categoriesBySlug[category]?.group : group
  const activeCategory = category ? categoriesBySlug[category] : null

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase()
    let list = products.filter((product) => {
      if (category && product.category !== category) return false
      if (!category && group) {
        const cat = categoriesBySlug[product.category]
        if (!cat || cat.group !== group) return false
      }
      if (!term) return true
      const categoryName = categoriesBySlug[product.category]?.name || ''
      return (
        product.name.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term) ||
        categoryName.toLowerCase().includes(term)
      )
    })

    switch (sort) {
      case 'price-asc':
        list = [...list].sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        list = [...list].sort((a, b) => b.price - a.price)
        break
      case 'rating':
        list = [...list].sort((a, b) => b.rating - a.rating)
        break
      case 'discount':
        list = [...list].sort((a, b) => b.discount - a.discount)
        break
      case 'new':
        list = [...list].sort((a, b) => Number(b.isNew) - Number(a.isNew))
        break
      case 'name':
        list = [...list].sort((a, b) => a.name.localeCompare(b.name, 'uz'))
        break
      default:
        list = [...list].sort((a, b) => Number(b.popular) - Number(a.popular))
    }

    return list
  }, [category, group, query, sort])

  const updateParams = (changes) => {
    const next = new URLSearchParams(searchParams)
    Object.entries(changes).forEach(([key, value]) => {
      if (value) next.set(key, value)
      else next.delete(key)
    })
    setSearchParams(next)
  }

  const submitSearch = (event) => {
    event.preventDefault()
    updateParams({ q: search.trim() })
  }

  const clearFilters = () => {
    setSearch('')
    setSearchParams(new URLSearchParams())
  }

  const title = activeCategory
    ? activeCategory.name
    : group
      ? categoryGroups.find((item) => item.id === group)?.title || 'Katalog'
      : 'Katalog'

  const categoriesForGroup = activeGroup
    ? categoryGroups.find((item) => item.id === activeGroup)?.categories || []
    : allCategories

  return (
    <div className="page">
      <div className="container">
        <Breadcrumbs
          items={[
            { label: 'Katalog', to: '/katalog' },
            ...(activeCategory ? [{ label: activeCategory.name }] : []),
            ...(!activeCategory && group ? [{ label: title }] : [])
          ]}
        />

        <div className="catalog-head">
          <div>
            <h1>{title}</h1>
            <p className="muted">
              {activeCategory?.description || 'Yangi va tabiiy mahsulotlar katalogi.'}
            </p>
          </div>
          <div className="catalog-head__count">
            <strong>{filtered.length}</strong>
            <span>mahsulot topildi</span>
          </div>
        </div>

        <div className="catalog-toolbar">
          <div className="group-tabs">
            <button
              type="button"
              className={`group-tab${!group && !category ? ' is-active' : ''}`}
              onClick={() => updateParams({ group: '', cat: '' })}
            >
              Barchasi
            </button>
            {categoryGroups.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`group-tab${activeGroup === item.id ? ' is-active' : ''}`}
                onClick={() => updateParams({ group: item.id, cat: '' })}
              >
                <span>{item.icon}</span>
                {item.title}
              </button>
            ))}
          </div>

          <div className="catalog-toolbar__row">
            <form className="catalog-search" onSubmit={submitSearch} role="search">
              <Icon name="search" size={18} className="search__icon" />
              <input
                type="search"
                className="input"
                placeholder="Katalogdan qidirish..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                aria-label="Katalogdan qidirish"
              />
              <button type="submit" className="btn btn--primary btn--sm">Qidirish</button>
            </form>

            <label className="sort">
              <Icon name="filter" size={16} />
              <span className="visually-hidden">Saralash</span>
              <select
                className="select"
                value={sort}
                onChange={(event) => updateParams({ sort: event.target.value === 'default' ? '' : event.target.value })}
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="chips">
            {categoriesForGroup.map((item) => (
              <button
                key={item.slug}
                type="button"
                className={`chip${category === item.slug ? ' is-active' : ''}`}
                onClick={() => updateParams({ cat: category === item.slug ? '' : item.slug })}
              >
                {item.name}
                <span className="chip__count">{countByCategory[item.slug] || 0}</span>
              </button>
            ))}
          </div>

          {(category || group || query || sort !== 'default') && (
            <div className="catalog-reset">
              <span className="muted">Faol filtrlar:</span>
              {activeCategory && <span className="filter-tag">{activeCategory.name}</span>}
              {!activeCategory && group && (
                <span className="filter-tag">{categoryGroups.find((item) => item.id === group)?.title}</span>
              )}
              {query && <span className="filter-tag">“{query}”</span>}
              {sort !== 'default' && (
                <span className="filter-tag">{sortOptions.find((item) => item.value === sort)?.label}</span>
              )}
              <button type="button" className="link-btn" onClick={clearFilters}>Tozalash</button>
            </div>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="empty card">
            <span className="empty__icon"><Icon name="search" size={38} /></span>
            <h2 className="empty__title">Hech narsa topilmadi</h2>
            <p className="empty__text">
              Boshqa so'z bilan qidirib ko'ring yoki filtrlarni tozalang. Mashhur qidiruvlar:
            </p>
            <div className="chips chips--center">
              {popularSearches.map((word) => (
                <button
                  key={word}
                  type="button"
                  className="chip"
                  onClick={() => {
                    setSearch(word)
                    updateParams({ q: word, cat: '', group: '' })
                  }}
                >
                  {word}
                </button>
              ))}
            </div>
            <button type="button" className="btn btn--outline" onClick={clearFilters}>Filtrlarni tozalash</button>
          </div>
        ) : (
          <>
            <div className="product-grid">
              {filtered.slice(0, visible).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            {visible < filtered.length && (
              <div className="section-more">
                <button type="button" className="btn btn--outline" onClick={() => setVisible((prev) => prev + PAGE_SIZE)}>
                  Yana ko'rsatish ({filtered.length - visible})
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default CatalogPage
