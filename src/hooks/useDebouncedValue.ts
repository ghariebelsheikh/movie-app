import { useEffect, useState } from "react";

const debounceTime = 300;

const useDebouncedValue = <T>(value: T): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const [lastUpdate, setLastUpdate] = useState(() => Date.now());

  useEffect(() => {
    setLastUpdate(Date.now());
  }, [value]);

  useEffect(() => {
    if (value === debouncedValue) return;

    const now = Date.now();
    const passedTime = now - lastUpdate;
    const remainingTime = debounceTime - passedTime;
    let deinitialized = false;

    const updateValue = () => {
      if (deinitialized) return;

      setDebouncedValue(value);
    };

    if (passedTime > debounceTime) return updateValue();

    setTimeout(updateValue, remainingTime);

    return () => {
      deinitialized = true;
    };
  }, [debouncedValue, lastUpdate, value]);

  return debouncedValue;
};

export default useDebouncedValue;
