
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, LockKeyhole } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart } from '../features/cart/cartSlice'
import CheckoutField from '../components/CheckoutField'
import useDocumentTitle from '../hooks/useDocumentTitle';
import { validateCheckout } from '../utils/validateCheckout';
import { formatCurrency } from '../utils/formatCurrency';


const DEMO_COUPONS = {
  FORMA10: 10,
  WELCOME15: 15,
}

export default function Checkout() {
  useDocumentTitle('Checkout');
  const cart = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [coupon, setCoupon] = useState('')
  const [discountPercent, setDiscountPercent] = useState(0)
  const [couponMessage, setCouponMessage] = useState('')
  const [formError, setFormError] = useState('')

  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  })

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  )

  const discount = Math.round(subtotal * discountPercent / 100)
  const delivery = subtotal === 0 || subtotal >= 25000 ? 0 : 499
  const total = subtotal - discount + delivery


function handleChange(event) {
  const { name, value } = event.target

  setForm((current) => ({
    ...current,
    [name]: value,
  }))

  if (touched[name]) {
    setErrors((current) => ({
      ...current,
      [name]: validateField(name, value),
    }))
  }

  setFormError('')
}

function handleBlur(event) {
  const { name, value } = event.target

  setTouched((current) => ({
    ...current,
    [name]: true,
  }))

  setErrors((current) => ({
    ...current,
    [name]: validateField(name, value),
  }))
}


  
function validateField(name, value) {
  const trimmed = value.trim()

  switch (name) {
    case 'name':
      if (!trimmed) return 'Full name is required.'
      if (trimmed.length < 3) return 'Name must be at least 3 characters.'
      return ''

    case 'email':
      if (!trimmed) return 'Email address is required.'
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
        return 'Enter a valid email address.'
      }
      return ''

    case 'phone':
      if (!trimmed) return 'Phone number is required.'
      if (!/^[0-9+\s()-]{8,20}$/.test(trimmed)) {
        return 'Enter a valid phone number.'
      }
      if (trimmed.replace(/\D/g, '').length < 10) {
        return 'Phone number must contain at least 10 digits.'
      }
      return ''

    case 'address':
      if (!trimmed) return 'Street address is required.'
      if (trimmed.length < 5) return 'Enter a complete street address.'
      return ''

    case 'city':
      return trimmed ? '' : 'City is required.'

    case 'state':
      return trimmed ? '' : 'State is required.'

    case 'pincode':
      if (!trimmed) return 'PIN code is required.'
      if (!/^[0-9]{6}$/.test(trimmed)) {
        return 'PIN code must contain exactly 6 digits.'
      }
      return ''

    default:
      return ''
  }
}


  function applyCoupon() {
    const code = coupon.trim().toUpperCase()
    const percentage = DEMO_COUPONS[code]

    if (!code) {
      setDiscountPercent(0)
      setCouponMessage('Enter a coupon code.')
      return
    }

    if (!percentage) {
      setDiscountPercent(0)
      setCouponMessage('Invalid demo coupon code.')
      return
    }

    setDiscountPercent(percentage)
    setCouponMessage(`${code} applied — ${percentage}% off!`)
  }




function handleSubmit(event) {
  event.preventDefault();
  setFormError('');

  // Validate all fields using the reusable utility
  const nextErrors = validateCheckout(form);

  setTouched({
    name: true,
    email: true,
    phone: true,
    address: true,
    city: true,
    state: true,
    pincode: true,
  });

  setErrors(nextErrors);

  if (Object.keys(nextErrors).length > 0) {
    setFormError('Please correct the highlighted fields.');
    return;
  }

  // Ensure the cart contains products
  if (cart.length === 0) {
    setFormError('Your bag is empty.');
    return;
  }

  // Create the demo order
  const order = {
    orderNumber: `FRM-${Date.now().toString().slice(-8)}`,
    customer: { ...form },
    items: cart.map((item) => ({ ...item })),
    subtotal,
    discount,
    delivery,
    total,
    placedAt: new Date().toISOString(),
  };

  // Save the order before clearing the cart
  try {
    sessionStorage.setItem(
      'forma-last-order',
      JSON.stringify(order)
    );
  } catch (error) {
    console.error('Failed to save demo order:', error);
    setFormError('Could not save your order. Please try again.');
    return;
  }

  dispatch(clearCart());

  navigate('/order-success', {
    state: { order },
  });
}





  if (cart.length === 0) {
    return (
      <main className="min-h-[70vh] bg-forma-cream px-5 py-24 text-center">
        <h1 className="font-display text-4xl">Your bag is empty.</h1>
        <p className="mt-4 text-sm text-neutral-500">
          Add something beautiful before checking out.
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
        <Link
          to="/cart"
          className="inline-flex items-center gap-2 text-xs text-neutral-500 hover:text-forma-brown"
        >
          <ArrowLeft size={15} /> Return to bag
        </Link>

        <div className="mb-10 mt-8">
          <p className="text-[10px] uppercase tracking-[0.25em] text-forma-brown">
            Almost yours
          </p>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl">
            Checkout
          </h1>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="grid gap-12 lg:grid-cols-[1fr_380px]">
            <div className="space-y-10">
              <section>
                <h2 className="font-display text-2xl">
                  Contact information
                </h2>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <CheckoutField
                      label="Full name"
                      name="name"
                      autoComplete="name"
                      value={form.name}
                      error={errors.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>

                  <CheckoutField
                    label="Email address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    error={errors.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  <CheckoutField
                    label="Phone number"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={form.phone}
                    error={errors.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>

              </section>

              <section>
                <h2 className="font-display text-2xl">
                  Delivery address
                </h2>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <CheckoutField
                      label="Street address"
                      name="address"
                      autoComplete="street-address"
                      value={form.address}
                      error={errors.address}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>

                  <CheckoutField
                    label="City"
                    name="city"
                    autoComplete="address-level2"
                    value={form.city}
                    error={errors.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  <CheckoutField
                    label="State"
                    name="state"
                    autoComplete="address-level1"
                    value={form.state}
                    error={errors.state}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  <CheckoutField
                    label="PIN code"
                    name="pincode"
                    autoComplete="postal-code"
                    value={form.pincode}
                    error={errors.pincode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>

              </section>

              <section>
                <h2 className="font-display text-2xl">Payment</h2>
                <div className="mt-5 border border-black/10 p-5">
                  <p className="text-sm font-medium">
                    Demo checkout — no payment required
                  </p>
                  <p className="mt-2 text-sm leading-6 text-neutral-500">
                    This portfolio project simulates an order. It does not
                    collect payment details or charge your card.
                  </p>
                </div>
              </section>
            </div>

            <aside className="h-fit border border-black/10 p-5 sm:p-7">
              <h2 className="font-display text-2xl">Your order</h2>

              <div className="mt-6 space-y-5">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4">
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
                      <p className="mt-2 text-sm">
                        {formatCurrency(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-7 border-t border-black/10 pt-5">
                <label htmlFor="coupon" className="mb-2 block text-sm">
                  Demo coupon
                </label>
                <div className="flex gap-2">
                  <input
                    id="coupon"
                    value={coupon}
                    onChange={(event) => {
                      setCoupon(event.target.value)
                      setCouponMessage('')
                    }}
                    className="min-w-0 flex-1 border border-black/15 bg-transparent px-3 py-3 text-sm outline-none focus:border-forma-brown"
                    placeholder="Enter code"
                  />
                  <button
                    type="button"
                    onClick={applyCoupon}
                    className="border border-forma-ink px-3 text-xs transition hover:bg-forma-ink hover:text-white"
                  >
                    Apply
                  </button>
                </div>


                {couponMessage && (
                  <p
                    aria-live="polite"
                    className={`mt-2 text-xs ${
                      couponMessage.includes('applied')
                        ? 'text-[#526B45]'
                        : 'text-[#B42318]'
                    }`}
                  >
                    {couponMessage}
                  </p>
                )}


                <p className="mt-2 text-xs text-neutral-500">
                  Try FORMA10 or WELCOME15.
                </p>
              </div>

              <div className="mt-6 space-y-4 border-t border-black/10 pt-5 text-sm">
                <div className="flex justify-between gap-3">
                  <span className="text-neutral-500">Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>

                <div className="flex justify-between gap-3">
                  <span className="text-neutral-500">Discount</span>
                  <span>−{formatCurrency(discount)}</span>
                </div>

                <div className="flex justify-between gap-3">
                  <span className="text-neutral-500">Delivery</span>
                  <span>{delivery === 0 ? 'Free' : formatCurrency(delivery)}</span>
                </div>

                <div className="flex justify-between gap-3 border-t border-black/10 pt-4 text-base font-medium">
                  <span>Total</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>

              {formError && (
                <p role="alert" className="mt-4 text-sm text-red-700">
                  {formError}
                </p>
              )}

              <button
                type="submit"
                className="forma-button mt-6 flex w-full items-center justify-center gap-2"
              >
                <LockKeyhole size={15} />
                Place demo order
              </button>

              <p className="mt-4 text-center text-[11px] leading-5 text-neutral-500">
                Demo only. No payment will be processed.
              </p>
            </aside>
          </div>
        </form>
      </div>
    </main>
  )
}
