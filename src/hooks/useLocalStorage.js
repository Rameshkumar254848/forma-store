
import { useState } from 'react';

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const storedValue = localStorage.getItem(key);

      return storedValue !== null
        ? JSON.parse(storedValue)
        : initialValue;
    } catch {
      return initialValue;
    }
  });

  function updateValue(newValue) {
    setValue((currentValue) => {
      const nextValue =
        typeof newValue === 'function'
          ? newValue(currentValue)
          : newValue;

      try {
        localStorage.setItem(key, JSON.stringify(nextValue));
      } catch (error) {
        console.error('Could not save local storage value:', error);
      }

      return nextValue;
    });
  }

  return [value, updateValue];
}
