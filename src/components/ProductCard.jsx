
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import ImageWithFallback from './ImageWithFallback';
import { formatCurrency } from '../utils/formatCurrency';

export default function ProductCard({
  product,
  view = 'grid',
  isFavorite = false,
  onToggleFavorite = () => {},
  onAddToCart = () => {},
}) {
  const isListView = view === 'list';

  return (
    <article
      className={`group min-w-0 ${
        isListView
          ? 'flex flex-col gap-4 border-b border-black/10 pb-6 sm:flex-row sm:gap-6'
          : ''
      }`}
    >
      {/* Product image */}
      <div
        className={`relative shrink-0 overflow-hidden bg-[#EAE5DC] ${
          isListView ? 'w-full sm:w-44 md:w-52' : 'w-full'
        }`}
      >
        <Link to={`/product/${product.id}`} className="block">
          <div
            className={
              isListView
                ? 'aspect-[4/3] overflow-hidden sm:aspect-[4/5]'
                : 'aspect-[4/5] overflow-hidden'
            }
          >
            <ImageWithFallback
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          </div>
        </Link>

        {product.badge && (
          <span className="absolute left-3 top-3 bg-forma-cream px-3 py-2 text-[9px] uppercase tracking-widest">
            {product.badge}
          </span>
        )}

        <button
          type="button"
          onClick={() => onToggleFavorite(product.id)}
          aria-label={
            isFavorite ? 'Remove from wishlist' : 'Add to wishlist'
          }
          aria-pressed={isFavorite}
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-forma-cream transition hover:bg-white"
        >
          <Heart
            size={18}
            fill={isFavorite ? '#A58A6A' : 'none'}
            color={isFavorite ? '#A58A6A' : '#292B27'}
          />
        </button>

        {!isListView && (
          <button
            type="button"
            onClick={() => onAddToCart(product)}
            className="absolute inset-x-0 bottom-0 translate-y-full bg-forma-ink px-3 py-4 text-sm text-white transition duration-300 hover:bg-forma-brown group-hover:translate-y-0 focus:translate-y-0"
          >
            Add to bag — {formatCurrency(product.price)}
          </button>
        )}
      </div>

      {/* Product details */}
      <div
        className={`flex min-w-0 flex-1 justify-between gap-3 ${
          isListView
            ? 'items-start py-1 sm:py-2'
            : 'items-start pt-4'
        }`}
      >
        <div className="min-w-0">
          <Link
            to={`/product/${product.id}`}
            className="text-sm font-medium transition hover:text-forma-brown"
          >
            {product.name}
          </Link>

          <p className="mt-1 text-xs text-neutral-500">
            {product.material}
          </p>

          {isListView && (
            <>
              <p className="mt-3 text-xs uppercase tracking-widest text-neutral-400">
                {product.category}
              </p>

              <button
                type="button"
                onClick={() => onAddToCart(product)}
                className="mt-5 border border-forma-ink px-5 py-3 text-xs transition hover:bg-forma-ink hover:text-white"
              >
                Add to bag
              </button>
            </>
          )}
        </div>

        <p className="shrink-0 text-sm font-medium">
          {formatCurrency(product.price)}
        </p>
      </div>
    </article>
  );
}
