import { useEffect, useState } from "react";

interface IDimensions {
  height: number;
  width: number;
}

export function useDimension(): IDimensions | null {
  const [dimension, setDimension] = useState<IDimensions | null>(null);
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setDimension({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [])

  return dimension;
}
