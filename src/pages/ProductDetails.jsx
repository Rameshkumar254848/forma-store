
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Heart, ShoppingBag } from 'lucide-react'
import { products } from '../data/products'
import { formatCurrency } from '../utils/formatCurrency';



export default function ProductDetails({
  wishlist = [],
  onToggleFavorite = () => {},
  onAddToCart = () => {},
}) {
  const { id } = useParams()
  const product = products.find((item) => item.id === Number(id))
  const [quantity, setQuantity] = useState(1)

  if (!product) {
    return (
      <main className="min-h-screen bg-forma-cream px-5 py-24 text-center">
        <h1 className="font-display text-3xl">Piece not found</h1>
        <Link to="/shop" className="forma-button mt-6">
          Return to collection
        </Link>
      </main>
    )
  }

  const isFavorite = wishlist.includes(product.id)

  return (
    <main className="min-h-screen bg-forma-cream px-5 py-10 md:px-10 md:py-16">
      <div className="mx-auto max-w-[1200px]">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-xs text-neutral-500 hover:text-forma-brown"
        >
          <ArrowLeft size={15} /> Back to collection
        </Link>

        <div className="mt-8 grid gap-10 md:grid-cols-2 md:gap-16">
          <div className="bg-[#EAE5DC]">
            <img
              src={product.image}
              alt={product.name}
              className="aspect-[4/5] w-full object-cover"
            />
          </div>

          <div className="py-4 md:py-12">
            <p className="text-[10px] uppercase tracking-[0.25em] text-forma-brown">
              {product.category} / FORMA collection
            </p>

            <h1 className="mt-5 font-display text-4xl leading-tight sm:text-5xl">
              {product.name}
            </h1>

            <p className="mt-5 text-xl">{formatCurrency(product.price)}</p>

            <p className="mt-6 text-sm leading-7 text-neutral-600">
              A thoughtfully selected piece designed to bring warmth,
              character and timeless simplicity to your home.
            </p>

            <div className="mt-8 border-y border-black/10 py-5">
              <p className="text-xs uppercase tracking-widest text-neutral-500">
                Material
              </p>
              <p className="mt-2 text-sm">{product.material}</p>
            </div>

            <div className="mt-7">
              <label htmlFor="quantity" className="text-sm">
                Quantity
              </label>
              <div className="mt-3 inline-flex items-center border border-black/15">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity === 1}
                  aria-label="Decrease quantity"
                  className="px-4 py-3 disabled:opacity-30"
                >
                  −
                </button>
                <output id="quantity" className="min-w-10 text-center text-sm">
                  {quantity}
                </output>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(99, q + 1))}
                  disabled={quantity === 99}
                  aria-label="Increase quantity"
                  className="px-4 py-3 disabled:opacity-30"
                >
                  +
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onAddToCart(product, quantity)}
              className="forma-button mt-8 flex w-full items-center justify-center gap-3"
            >
              <ShoppingBag size={17} />
              Add to bag — {formatCurrency(product.price * quantity)}
            </button>

            <button
              type="button"
              onClick={() => onToggleFavorite(product.id)}
              aria-pressed={isFavorite}
              className="mt-4 flex w-full items-center justify-center gap-2 border border-black/15 px-6 py-4 text-sm transition hover:border-forma-brown"
            >
              <Heart
                size={17}
                fill={isFavorite ? '#A58A6A' : 'none'}
                color={isFavorite ? '#A58A6A' : '#292B27'}
              />
              {isFavorite ? 'Saved to wishlist' : 'Add to wishlist'}
            </button>

            <p className="mt-6 text-xs leading-6 text-neutral-500">
              Product imagery and specifications are for this demo store.
              Shipping and payment are not yet connected.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
