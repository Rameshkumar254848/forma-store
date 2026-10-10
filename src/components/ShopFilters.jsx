
import { Search, SlidersHorizontal } from 'lucide-react'

export default function ShopFilters({
  search,
  setSearch,
  category,
  setCategory,
  maxPrice,
  setMaxPrice,
  sort,
  setSort,
  categories,
}) {
  return (
    <div className="space-y-5 border-y border-black/10 py-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-sm">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500"
          />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search furniture..."
            aria-label="Search products"
            className="w-full border border-black/15 bg-transparent py-3 pl-10 pr-4 text-sm outline-none transition focus:border-forma-brown"
          />
        </div>

        <div className="flex items-center gap-2">
          <SlidersHorizontal size={17} />
          <label htmlFor="sort-products" className="text-sm">
            Sort by
          </label>
          <select
            id="sort-products"
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            className="min-w-36 border border-black/15 bg-forma-cream px-3 py-3 text-sm outline-none focus:border-forma-brown"
          >
            <option value="featured">Featured</option>
            <option value="name-asc">Name: A–Z</option>
            <option value="price-asc">Price: Low to high</option>
            <option value="price-desc">Price: High to low</option>
          </select>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {['All', ...categories].map((item) => {
          const value = item === 'All' ? 'All' : item
          const active = category === value

          return (
            <button
              key={value}
              type="button"
              onClick={() => setCategory(value)}
              aria-pressed={active}
              className={`border px-4 py-2 text-xs transition ${
                active
                  ? 'border-forma-ink bg-forma-ink text-white'
                  : 'border-black/15 hover:border-forma-brown'
              }`}
            >
              {value}
            </button>
          )
        })}
      </div>

      <div className="max-w-sm">
        <div className="mb-2 flex items-center justify-between text-sm">
          <label htmlFor="max-price">Maximum price</label>
          <span>
            {new Intl.NumberFormat('en-IN', {
              style: 'currency',
              currency: 'INR',
              maximumFractionDigits: 0,
            }).format(maxPrice)}
          </span>
        </div>

        <input
          id="max-price"
          type="range"
          min="5000"
          max="50000"
          step="1000"
          value={maxPrice}
          onChange={(event) => setMaxPrice(Number(event.target.value))}
          className="w-full accent-[#A58A6A]"
        />
        <div className="flex justify-between text-xs text-neutral-500">
          <span>₹5,000</span>
          <span>₹50,000</span>
        </div>
      </div>
    </div>
  )
}
