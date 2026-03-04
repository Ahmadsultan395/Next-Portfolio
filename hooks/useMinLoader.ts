import { useEffect, useState } from "react";

const useMinLoader = (data: any, delay = 1000): boolean => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return loading || !data;
};

export default useMinLoader;
