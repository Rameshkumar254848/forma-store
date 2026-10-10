import { useCallback, useRef, useState } from 'react';
import { Link, Route, Routes, Navigate } from 'react-router-dom'
import {
  ArrowDownRight,
  ArrowRight,
  Heart,
  Menu,
  ShoppingBag,
  X,
} from 'lucide-react'
import { products, categories } from './data/products'
import Shop from './pages/Shop'
import ProductDetails from './pages/ProductDetails'

import { useDispatch, useSelector } from 'react-redux'
import { addToCart as addCartItem } from './features/cart/cartSlice'
import { toggleWishlist } from './features/wishlist/wishlistSlice'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import OrderSuccess from './pages/OrderSuccess'
import Wishlist from './pages/Wishlist'
import useClickOutside from './hooks/useClickOutside';
import { formatCurrency } from './utils/formatCurrency';


function Header({ cartCount, wishlist, onOpenMenu }) {
  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-forma-cream/95 backdrop-blur-md">
      <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 md:px-10">
        <button
          onClick={onOpenMenu}
          className="p-2 md:hidden"
          aria-label="Open navigation"
        >
          <Menu size={22} strokeWidth={1.5} />
        </button>

        <Link to="/" className="text-2xl font-semibold tracking-[0.22em]">
          FORMA<span className="text-forma-brown">.</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm md:flex">
          <a href="#collections" className="transition hover:text-forma-brown">
            Collections
          </a>
          <a href="#bestsellers" className="transition hover:text-forma-brown">
            Bestsellers
          </a>
          <a href="#our-story" className="transition hover:text-forma-brown">
            Our story
          </a>
        </nav>

        <div className="flex items-center gap-3 sm:gap-5">

          <Link
            to="/wishlist"
            className="relative p-2"
            aria-label={`Wishlist, ${wishlist.length} items`}
          >
            <Heart size={21} strokeWidth={1.5} />

            {wishlist.length > 0 && (
              <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-forma-ink px-1 text-[10px] text-white">
                {wishlist.length}
              </span>
            )}
          </Link>



        <Link
          to="/cart"
          className="relative p-2"
          aria-label={`Shopping bag, ${cartCount} items`}
        >
          <ShoppingBag size={21} strokeWidth={1.5} />

          {cartCount > 0 && (
            <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-forma-ink px-1 text-[10px] text-white">
              {cartCount}
            </span>
          )}
        </Link>

        </div>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="mx-auto grid max-w-[1440px] gap-8 px-5 pb-16 pt-10 md:grid-cols-2 md:items-center md:gap-12 md:px-10 md:pb-24 md:pt-14">
      <div className="py-8 md:py-12">
        <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.3em] text-forma-brown">
          Objects for living
        </p>

        <h1 className="max-w-xl font-display text-5xl leading-[1.08] tracking-[-0.04em] sm:text-6xl lg:text-[76px]">
          Make room for
          <br />
          <span className="italic">better living.</span>
        </h1>

        <p className="mt-7 max-w-md text-sm leading-7 text-neutral-600 sm:text-base">
          Thoughtfully designed furniture and timeless pieces
          for the spaces you call home.
        </p>

        <Link to="/shop" className="forma-button mt-8">
          Explore the collection
          <ArrowRight size={17} />
        </Link>

        <div className="mt-12 flex items-center gap-3 text-xs text-neutral-500">
          <span className="h-px w-10 bg-forma-brown" />
          Designed for the everyday
        </div>
      </div>

      <div className="relative min-h-[380px] overflow-hidden bg-[#e6ded2] sm:min-h-[500px] md:min-h-[580px]">
        <img
          src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=90"
          alt="Warm contemporary living room with thoughtfully arranged furniture"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute bottom-5 left-5 flex items-center gap-3 bg-forma-cream/95 px-4 py-3 sm:bottom-8 sm:left-8">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500">
              The new collection
            </p>
            <p className="mt-1 font-display text-lg">Quietly considered</p>
          </div>
          <ArrowDownRight size={21} strokeWidth={1.3} />
        </div>
      </div>
    </section>
  )
}

function Categories() {
  return (
    <section id="collections" className="bg-[#EAE5DC] px-5 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-[1360px]">
        <div className="mb-9 flex items-end justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-forma-brown">
              Find your feeling
            </p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl">
              Shop by collection
            </h2>
          </div>
          <span className="hidden text-sm text-neutral-500 sm:block">
            Made to live with.
          </span>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => (
            <a
              href="#bestsellers"
              key={category.name}
              className="group relative block overflow-hidden bg-[#d7cbbd]"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>

              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/60 via-black/10 to-transparent p-5 pt-20 text-white sm:p-7 sm:pt-24">
                <div>
                  <p className="mb-2 text-xs text-white/80">
                    0{index + 1} / Collection
                  </p>
                  <h3 className="font-display text-3xl">{category.name}</h3>
                  <p className="mt-1 text-sm text-white/85">
                    {category.description}
                  </p>
                </div>
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/60 transition group-hover:bg-white group-hover:text-forma-ink">
                  <ArrowRight size={18} />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProductCard({ product, isFavorite, onToggleFavorite, onAddToCart }) {
  return (
    <article className="group min-w-0">
      <div className="relative overflow-hidden bg-[#EAE5DC]">
        <Link to={`/product/${product.id}`} className="block">
          <div className="aspect-[4/5] overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />
          </div>
        </Link>

        {product.badge && (
          <span className="absolute left-3 top-3 bg-forma-cream px-3 py-2 text-[9px] uppercase tracking-[0.15em] sm:left-4 sm:top-4">
            {product.badge}
          </span>
        )}

        <button
          type="button"
          onClick={() => onToggleFavorite(product.id)}
          aria-label={isFavorite ? 'Remove from wishlist' : 'Add to wishlist'}
          aria-pressed={isFavorite}
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-forma-cream/95 transition hover:bg-white sm:right-4 sm:top-4"
        >
          <Heart
            size={18}
            strokeWidth={1.5}
            fill={isFavorite ? '#A58A6A' : 'none'}
            color={isFavorite ? '#A58A6A' : '#292B27'}
          />
        </button>

        <button
          type="button"
          onClick={() => onAddToCart(product)}
          className="absolute inset-x-0 bottom-0 translate-y-full bg-forma-ink px-4 py-4 text-sm text-white transition-transform duration-300 hover:bg-forma-brown group-hover:translate-y-0 focus:translate-y-0"
        >
          Add to bag — {formatCurrency(product.price)}
        </button>
      </div>

      <div className="flex items-start justify-between gap-3 pt-4">
        <div>
          <Link
            to={`/product/${product.id}`}
            className="font-medium transition hover:text-forma-brown"
          >
            {product.name}
          </Link>
          <p className="mt-1 text-xs text-neutral-500">{product.material}</p>
        </div>
        <p className="shrink-0 text-sm">{formatCurrency(product.price)}</p>
      </div>
    </article>
  )
}

function Bestsellers({ wishlist, onToggleFavorite, onAddToCart }) {
  return (
    <section id="bestsellers" className="px-5 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-[1360px]">
        <div className="mb-9 flex items-end justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-forma-brown">
              Loved for a reason
            </p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl">
              Considered favourites
            </h2>
          </div>
          <a
            href="#collections"
            className="flex items-center gap-2 pb-1 text-xs transition hover:text-forma-brown sm:text-sm"
          >
            Explore all <ArrowRight size={15} />
          </a>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-9 sm:gap-x-6 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isFavorite={wishlist.includes(product.id)}
              onToggleFavorite={onToggleFavorite}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function Story() {
  return (
    <section id="our-story" className="bg-forma-ink px-5 py-16 text-forma-cream md:px-10 md:py-24">
      <div className="mx-auto grid max-w-[1360px] gap-8 md:grid-cols-2 md:items-end">
        <div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-forma-sand">
            Less, but more meaningful
          </p>
          <h2 className="mt-5 max-w-xl font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">
            A home should feel like <span className="italic">you.</span>
          </h2>
        </div>

        <div className="md:justify-self-end md:pl-10">
          <p className="max-w-lg text-sm leading-7 text-white/65">
            We believe in thoughtful forms, honest materials and pieces
            that become part of your everyday rituals. Fewer things.
            Better choices. A little more room to live.
          </p>
          <a href="#collections" className="forma-button mt-7">
            Discover FORMA <ArrowRight size={17} />
          </a>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="px-5 py-8 md:px-10">
      <div className="mx-auto flex max-w-[1360px] flex-col gap-4 border-t border-black/10 pt-6 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
        <Link to="/" className="font-semibold tracking-[0.2em] text-forma-ink">
          FORMA.
        </Link>
        <p>Thoughtfully made for everyday living.</p>
        <p>© {new Date().getFullYear()} FORMA Studio</p>
      </div>
    </footer>
  )
}

function MobileMenu({ open, onClose, menuRef }) {
  if (!open) return null

  return (
    <div ref={menuRef}>
    <div className="fixed inset-0 z-[60] bg-forma-cream p-6 md:hidden">
      <div className="flex items-center justify-between">
        <Link to="/" onClick={onClose} className="text-xl font-semibold tracking-[0.2em]">
          FORMA.
        </Link>
        <button onClick={onClose} aria-label="Close navigation" className="p-2">
          <X size={24} />
        </button>
      </div>

      <nav className="mt-16 flex flex-col gap-7 font-display text-3xl">
        <a href="#collections" onClick={onClose}>Collections</a>
        <a href="#bestsellers" onClick={onClose}>Bestsellers</a>
        <a href="#our-story" onClick={onClose}>Our story</a>
      </nav>
    </div>
    </div>
  )
}



export default function App() {
  const dispatch = useDispatch()



  const cart = useSelector((state) => state.cart)
  const wishlist = useSelector((state) => state.wishlist)

  const [menuOpen, setMenuOpen] = useState(false)

  const menuRef = useRef(null);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  useClickOutside(menuRef, closeMenu);

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0,
  )

  function handleToggleFavorite(productId) {
    dispatch(toggleWishlist(productId))
  }

  function handleAddToCart(product, quantity = 1) {
    dispatch(
      addCartItem({
        product,
        quantity,
      }),
    )
  }

  return (
    <>
      <Header
        cartCount={cartCount}
        wishlist={wishlist}
        onOpenMenu={() => setMenuOpen(true)}
      />

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        menuRef={menuRef}
      />

      <Routes>
        <Route
          path="/"
          element={
            <main>
              <Hero />
              <Categories />
              <Bestsellers
                wishlist={wishlist}
                onToggleFavorite={handleToggleFavorite}
                onAddToCart={handleAddToCart}
              />
              <Story />
            </main>
          }
        />

        <Route
          path="/shop"
          element={
            <Shop
              wishlist={wishlist}
              onToggleFavorite={handleToggleFavorite}
              onAddToCart={handleAddToCart}
            />
          }
        />

        <Route
          path="/product/:id"
          element={
            <ProductDetails
              wishlist={wishlist}
              onToggleFavorite={handleToggleFavorite}
              onAddToCart={handleAddToCart}
            />
          }
        />

        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>

      <Footer />
    </>
  )
}


