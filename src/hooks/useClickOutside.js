
import { useEffect } from 'react';

export default function useClickOutside(ref, onOutsideClick) {
  useEffect(() => {
    function handleClick(event) {
      if (
        ref.current &&
        !ref.current.contains(event.target)
      ) {
        onOutsideClick(event);
      }
    }

    document.addEventListener('mousedown', handleClick);
    document.addEventListener('touchstart', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('touchstart', handleClick);
    };
  }, [ref, onOutsideClick]);
}
