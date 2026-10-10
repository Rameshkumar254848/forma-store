
import { useState } from 'react'

export default function ImageWithFallback({
  src,
  alt,
  className = '',
  loading = 'lazy',
}) {
  const [failed, setFailed] = useState(false)

  return (
    <div
      className={`relative overflow-hidden bg-[#EAE5DC] ${className}`}
    >
      {!failed ? (
        <img
          src={src}
          alt={alt}
          loading={loading}
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <div
          role="img"
          aria-label={`${alt} image unavailable`}
          className="flex h-full min-h-40 w-full items-center justify-center p-6 text-center"
        >
          <div>
            <p className="font-display text-2xl text-[#A58A6A]">
              FORMA.
            </p>
            <p className="mt-2 text-xs text-neutral-500">
              Image temporarily unavailable
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
