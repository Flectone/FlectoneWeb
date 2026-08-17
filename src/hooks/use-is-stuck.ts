import { useEffect, useState, useRef, RefObject } from "react";

export function useIsStuck<T extends HTMLElement>(
  topOffset: number = 57,
): [RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [isStuck, setIsStuck] = useState(false);

  useEffect(() => {
    const cachedRef = ref.current;
    if (!cachedRef) return;

    const margin = topOffset + 1;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsStuck(entry.intersectionRatio < 1);
      },
      {
        threshold: [1],
        rootMargin: `-${margin}px 0px 0px 0px`,
      },
    );

    observer.observe(cachedRef);

    return () => {
      observer.unobserve(cachedRef);
    };
  }, [topOffset]);

  return [ref, isStuck];
}
