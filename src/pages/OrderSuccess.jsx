
import { Link, useLocation, Navigate } from 'react-router-dom'
import { Check, PackageCheck } from 'lucide-react'
import { formatCurrency } from '../utils/formatCurrency';

function getSavedOrder() {
  try {
    const saved = sessionStorage.getItem('forma-last-order')
    return saved ? JSON.parse(saved) : null
  } catch {
    return null
  }
}

export default function OrderSuccess() {
  const location = useLocation()
  const order = location.state?.order ?? getSavedOrder()

  if (!order || !order.orderNumber || !Array.isArray(order.items)) {
    return <Navigate to="/" replace />
  }

  return (
    <main className="min-h-[80vh] bg-forma-cream px-5 py-12 md:px-10 md:py-20">
      <div className="mx-auto max-w-2xl">
        <div className="border border-black/10 bg-white/30 p-6 sm:p-10">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E5E9DE] text-[#48553F]">
            <Check size={28} />
          </div>

          <p className="mt-7 text-[10px] uppercase tracking-[0.25em] text-forma-brown">
            Thank you for choosing FORMA
          </p>

          <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
            Your order is confirmed.
          </h1>

          <p className="mt-4 text-sm leading-7 text-neutral-600">
            Thank you, {order.customer?.name || 'there'}.
            Your demo order has been placed successfully.
          </p>

          <div className="mt-8 border-y border-black/10 py-5">
            <p className="text-xs text-neutral-500">Demo order number</p>
            <p className="mt-2 text-lg font-medium tracking-wide">
              {order.orderNumber}
            </p>
            <p className="mt-2 text-xs text-neutral-500">
              {new Date(order.placedAt).toLocaleString('en-IN')}
            </p>
          </div>

          <div className="mt-7">
            <h2 className="font-display text-2xl">Order summary</h2>

            <div className="mt-5 space-y-5">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-20 w-16 shrink-0 object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="mt-1 text-xs text-neutral-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>

                  <p className="shrink-0 text-sm">
                    {formatCurrency(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-7 space-y-3 border-t border-black/10 pt-5 text-sm">
            <div className="flex justify-between">
              <span className="text-neutral-500">Subtotal</span>
              <span>{formatCurrency(order.subtotal)}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-neutral-500">Discount</span>
              <span>−{formatCurrency(order.discount)}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-neutral-500">Delivery</span>
              <span>{order.delivery === 0 ? 'Free' : formatCurrency(order.delivery)}</span>
            </div>

            <div className="flex justify-between border-t border-black/10 pt-4 text-base font-medium">
              <span>Total paid</span>
              <span>{formatCurrency(order.total)}</span>
            </div>
          </div>

          <div className="mt-7 flex gap-3 bg-[#EAE5DC] p-4">
            <PackageCheck className="shrink-0" size={22} />
            <p className="text-xs leading-5 text-neutral-600">
              This is a portfolio demonstration. No real payment was taken,
              and no physical order will be shipped.
            </p>
          </div>

          <Link to="/" className="forma-button mt-8 flex w-full justify-center">
            Continue exploring FORMA
          </Link>
        </div>
      </div>
    </main>
  )
}
