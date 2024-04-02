import { useEffect, useState } from "react";

export default function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window !== "undefined") {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    }

    return initialValue;
  });

  function setValue(value: T | ((val: T) => T)) {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(value);

    if (typeof window !== undefined) {
      localStorage.setItem(key, JSON.stringify(valueToStore));
    }
  }

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(storedValue));
  }, [key, storedValue]);

  return [storedValue, setValue];
}
