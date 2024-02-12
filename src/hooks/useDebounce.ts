import { useState, useEffect } from "react";

const useDebounce = (text, delay) => {
  const [debouncedText, setDebouncedText] = useState(text);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedText(text);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [text, delay]);

  return debouncedText;
};

export default useDebounce;
