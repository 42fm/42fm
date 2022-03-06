import { useState } from "react";

function useHistory<T = null>(initialValue: any[] | T[], limit: number = 10): [T[], (value: T) => void] {
  const [history, setHistory] = useState<T[]>(initialValue);

  function push(item: T) {
    setHistory((prev) => {
      if (prev.length >= limit) {
        return [item, ...prev.slice(0, limit - 1)];
      } else {
        return [item, ...prev];
      }
    });
  }

  return [history, push];
}

export default useHistory;
