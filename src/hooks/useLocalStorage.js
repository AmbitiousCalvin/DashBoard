import { useState, useEffect } from "react";

function getSavedValue(key, initialValue) {
  const savedItem = JSON.parse(localStorage.getItem(key));
  if (savedItem) return savedItem;

  if (initialValue instanceof Function) return initialValue();
  return initialValue;
}

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    return getSavedValue(key, initialValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
}
