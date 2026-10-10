
export default function CheckoutField({
  label,
  name,
  type = 'text',
  autoComplete,
  value,
  error,
  onChange,
  onBlur,
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm">
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        required
        className={`w-full border bg-transparent px-4 py-3 text-sm outline-none transition focus:border-forma-brown ${
          error ? 'border-red-600' : 'border-black/15'
        }`}
      />

      {error && (
        <p
          id={`${name}-error`}
          role="alert"
          className="mt-1 text-xs text-red-700"
        >
          {error}
        </p>
      )}
    </div>
  )
}
