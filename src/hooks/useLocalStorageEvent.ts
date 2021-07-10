import { useCallback, useEffect, useMemo, useState } from "react";

const useLocalStorageState = <T>(
  key: string
): [T | null, (value: T) => void] => {
  const [rawValue, setRawValue] = useState<string | null>(() =>
    localStorage.getItem(key)
  );

  useEffect(() => {
    const updateValue = (event: StorageEvent) => {
      if (event.key === key) setRawValue(event.newValue);
    };

    window.addEventListener("storage", updateValue);

    return () => window.removeEventListener("storage", updateValue);
  }, [key]);

  const value = useMemo(() => rawValue && JSON.parse(rawValue), [rawValue]);

  const setValue = useCallback(
    (newValue: T) => {
      const rawNewValue = JSON.stringify(newValue);
      if (rawValue === rawNewValue) return;

      localStorage.setItem(key, rawNewValue);

      const event: any = document.createEvent("StorageEvent");
      event.initStorageEvent(
        "storage",
        false,
        false,
        key,
        rawValue,
        rawNewValue,
        window.location,
        localStorage
      );

      window.dispatchEvent(event);
    },
    [key, rawValue]
  );

  return [value, setValue];
};

export default useLocalStorageState;
