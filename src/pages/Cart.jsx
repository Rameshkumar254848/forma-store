
import { Link } from 'react-router-dom'
import { ArrowLeft, Minus, Plus, Trash2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import {
  removeFromCart,
  updateQuantity,
} from '../features/cart/cartSlice'
import useDocumentTitle from '../hooks/useDocumentTitle';
import { formatCurrency } from '../utils/formatCurrency';

export default function Cart() {
  useDocumentTitle('Your Cart');
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  )

  const delivery = subtotal === 0 || subtotal >= 25000 ? 0 : 499
  const total = subtotal + delivery

  if (cart.length === 0) {
    return (
      <main className="min-h-[70vh] bg-forma-cream px-5 py-24 text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-forma-brown">
          Your FORMA bag
        </p>
        <h1 className="mt-5 font-display text-4xl">Nothing here just yet.</h1>
        <p className="mt-4 text-sm text-neutral-500">
          Find a piece that feels like home.
        </p>
        <Link to="/shop" className="forma-button mt-8">
          Explore the collection
        </Link>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-forma-cream px-5 py-12 md:px-10 md:py-16">
      <div className="mx-auto max-w-[1200px]">
        <Link to="/shop" className="inline-flex items-center gap-2 text-xs text-neutral-500 hover:text-forma-brown">
          <ArrowLeft size={15} /> Continue shopping
        </Link>

        <h1 className="mb-10 mt-8 font-display text-4xl sm:text-5xl">
          Your shopping bag
        </h1>

        <div className="grid gap-12 lg:grid-cols-[1fr_350px]">
          <div className="space-y-6">
            {cart.map((item) => (
              <article
                key={item.id}
                className="flex gap-4 border-b border-black/10 pb-6 sm:gap-6"
              >
                <Link to={`/product/${item.id}`} className="w-28 shrink-0 bg-[#EAE5DC] sm:w-40">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="aspect-[4/5] h-full w-full object-cover"
                  />
                </Link>

                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Link to={`/product/${item.id}`} className="font-medium hover:text-forma-brown">
                        {item.name}
                      </Link>
                      <p className="mt-1 text-xs text-neutral-500">
                        {item.material}
                      </p>
                    </div>
                    <p className="shrink-0 text-sm">
                      {formatCurrency(item.price * item.quantity)}
                    </p>
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-5">
                    <div className="flex items-center border border-black/15">
                      <button
                        type="button"
                        aria-label={`Decrease ${item.name} quantity`}
                        disabled={item.quantity <= 1}
                        onClick={() =>
                          dispatch(updateQuantity({
                            id: item.id,
                            quantity: item.quantity - 1,
                          }))
                        }
                        className="p-2 disabled:opacity-30"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="min-w-8 text-center text-xs">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        aria-label={`Increase ${item.name} quantity`}
                        disabled={item.quantity >= 99}
                        onClick={() =>
                          dispatch(updateQuantity({
                            id: item.id,
                            quantity: item.quantity + 1,
                          }))
                        }
                        className="p-2 disabled:opacity-30"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="flex items-center gap-1 text-xs text-neutral-500 hover:text-red-700"
                    >
                      <Trash2 size={14} /> Remove
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <aside className="h-fit border border-black/10 p-6">
            <h2 className="font-display text-2xl">Order summary</h2>

            <div className="mt-7 space-y-4 text-sm">
              <div className="flex justify-between gap-3">
                <span className="text-neutral-500">Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-neutral-500">Delivery</span>
                <span>{delivery === 0 ? 'Free' : formatCurrency(delivery)}</span>
              </div>
              <div className="border-t border-black/10 pt-4">
                <div className="flex justify-between gap-3 font-medium">
                  <span>Total</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>
            </div>

            <p className="mt-5 text-xs leading-5 text-neutral-500">
              Free delivery on orders of ₹25,000 or more.
            </p>

            <Link to="/checkout" className="forma-button mt-6 flex w-full justify-center">
              Continue to checkout
            </Link>
          </aside>
        </div>
      </div>
    </main>
  )
}
