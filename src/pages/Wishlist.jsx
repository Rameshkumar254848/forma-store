
import { Link } from 'react-router-dom'
import { ArrowLeft, Heart } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { products } from '../data/products'
import { toggleWishlist } from '../features/wishlist/wishlistSlice'
import { addToCart } from '../features/cart/cartSlice'
import ProductCard from '../components/ProductCard'
import useDocumentTitle from '../hooks/useDocumentTitle';

export default function Wishlist() {
    useDocumentTitle('Your Wishlist');
  const dispatch = useDispatch()
  const wishlist = useSelector((state) => state.wishlist)

  const savedProducts = products.filter((product) =>
    wishlist.includes(product.id),
  )

  function handleRemove(productId) {
    dispatch(toggleWishlist(productId))
  }

  function handleAddToCart(product) {
    dispatch(addToCart({ product, quantity: 1 }))
  }

  return (
    <main className="min-h-[70vh] bg-forma-cream px-5 py-10 md:px-10 md:py-16">
      <div className="mx-auto max-w-[1360px]">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs text-neutral-500 transition hover:text-forma-brown"
        >
          <ArrowLeft size={15} />
          Back to home
        </Link>

        <div className="mb-10 mt-8">
          <p className="text-[10px] uppercase tracking-[0.25em] text-forma-brown">
            Your personal collection
          </p>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
            <h1 className="font-display text-4xl sm:text-5xl">
              Your wishlist
            </h1>

            <span className="text-sm text-neutral-500">
              {savedProducts.length}{' '}
              {savedProducts.length === 1 ? 'piece' : 'pieces'} saved
            </span>
          </div>

          <p className="mt-3 max-w-lg text-sm leading-6 text-neutral-600">
            Keep the pieces you love in one place and come back
            to them whenever you're ready.
          </p>
        </div>

        {savedProducts.length === 0 ? (
          <section className="flex flex-col items-center border border-black/10 px-5 py-16 text-center sm:py-24">
            <Heart
              size={34}
              strokeWidth={1.2}
              className="text-forma-brown"
            />

            <h2 className="mt-6 font-display text-3xl">
              Nothing saved just yet.
            </h2>

            <p className="mt-3 max-w-sm text-sm leading-6 text-neutral-500">
              Explore our collection and save the pieces that
              feel right for your home.
            </p>

            <Link to="/shop" className="forma-button mt-7">
              Explore the collection
            </Link>
          </section>
        ) : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-9 sm:gap-x-6 lg:grid-cols-4">
            {savedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isFavorite={true}
                onToggleFavorite={handleRemove}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}

        {savedProducts.length > 0 && (
          <div className="mt-10 flex justify-center">
            <Link to="/shop" className="forma-button">
              Continue shopping
            </Link>
          </div>
        )}
      </div>
    </main>
  )
}
