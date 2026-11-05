import { RefObject, useEffect, useRef } from "react";

export const useDimensions = (ref: RefObject<HTMLElement | null>) => {
  const dimensions = useRef({ width: 0, height: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    dimensions.current.width = el.offsetWidth;
    dimensions.current.height = el.offsetHeight;
  }, [ref]);

  return dimensions.current;
};