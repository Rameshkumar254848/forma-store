
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Grid2X2, List } from 'lucide-react'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'
import ShopFilters from '../components/ShopFilters'
import useDocumentTitle from '../hooks/useDocumentTitle';
import useDebounce from '../hooks/useDebounce';
import useLocalStorage from '../hooks/useLocalStorage';

const categories = [...new Set(products.map((product) => product.category))]

export default function Shop({
  wishlist = [],
  onToggleFavorite = () => {},
  onAddToCart = () => {},
}) {
  useDocumentTitle('Shop');
  const [view, setView] = useLocalStorage('forma-shop-view', 'grid');
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 300);
  const [category, setCategory] = useState('All')
  const [maxPrice, setMaxPrice] = useState(50000)
  const [sort, setSort] = useState('featured')



const visibleProducts = useMemo(() => {
  const filtered = products.filter((product) => {
    const matchesSearch =
      `${product.name} ${product.material} ${product.category}`
        .toLowerCase()
        .includes(debouncedSearch.trim().toLowerCase());

    const matchesCategory =
      category === 'All' || product.category === category;

    return (
      matchesSearch &&
      matchesCategory &&
      product.price <= maxPrice
    );
  });

  switch (sort) {
    case 'name-asc':
      filtered.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'price-asc':
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      filtered.sort((a, b) => b.price - a.price);
      break;
    default:
      break;
  }

  return filtered;
}, [debouncedSearch, category, maxPrice, sort]);



  return (
    <main className="min-h-screen bg-forma-cream">
      <section className="mx-auto max-w-[1360px] px-5 py-10 md:px-10 md:py-16">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs text-neutral-500 transition hover:text-forma-brown"
        >
          <ArrowLeft size={15} />
          Back to home
        </Link>

        <div className="mb-8 mt-8">
          <p className="text-[10px] uppercase tracking-[0.25em] text-forma-brown">
            Thoughtfully chosen
          </p>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl">
            The collection
          </h1>
          <p className="mt-3 max-w-lg text-sm leading-6 text-neutral-600">
            Furniture and objects designed to make everyday living
            feel a little more considered.
          </p>
        </div>

        <ShopFilters
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          sort={sort}
          setSort={setSort}
          categories={categories}
        />


<div className="mb-6 mt-8 flex flex-wrap items-center justify-between gap-4">
  <p className="text-sm text-neutral-600">
    {visibleProducts.length}{' '}
    {visibleProducts.length === 1 ? 'piece' : 'pieces'}
  </p>

  <div className="flex items-center gap-4">
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={() => setView('grid')}
        aria-label="Grid view"
        aria-pressed={view === 'grid'}
        className={`rounded border p-2 transition ${
          view === 'grid'
            ? 'border-forma-ink bg-forma-ink text-white'
            : 'border-black/15 hover:border-forma-ink'
        }`}
      >
        <Grid2X2 size={16} />
      </button>

      <button
        type="button"
        onClick={() => setView('list')}
        aria-label="List view"
        aria-pressed={view === 'list'}
        className={`rounded border p-2 transition ${
          view === 'list'
            ? 'border-forma-ink bg-forma-ink text-white'
            : 'border-black/15 hover:border-forma-ink'
        }`}
      >
        <List size={16} />
      </button>
    </div>

    <button
      type="button"
      onClick={() => {
        setSearch('')
        setCategory('All')
        setMaxPrice(50000)
        setSort('featured')
      }}
      className="text-xs underline underline-offset-4 hover:text-forma-brown"
    >
      Clear filters
    </button>
  </div>
</div>


        {visibleProducts.length > 0 ? (

          <div
            className={
              view === 'grid'
                ? 'grid grid-cols-2 gap-x-4 gap-y-9 sm:gap-x-6 lg:grid-cols-4'
                : 'mx-auto flex max-w-5xl flex-col gap-6'
            }
          >
            {visibleProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                view={view}
                isFavorite={wishlist.includes(product.id)}
                onToggleFavorite={onToggleFavorite}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>

        ) : (
          <div className="py-24 text-center">
            <h2 className="font-display text-2xl">No pieces found</h2>
            <p className="mt-3 text-sm text-neutral-500">
              Try changing your search or adjusting the filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearch('')
                setCategory('All')
                setMaxPrice(50000)
              }}
              className="forma-button mt-6"
            >
              View all pieces
            </button>
          </div>
        )}
      </section>
    </main>
  )
}
