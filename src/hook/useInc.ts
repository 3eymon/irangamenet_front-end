import { useEffect, useState } from "react";

export default function useInc(limt) {
  const [value, seValue] = useState(0);
  const limiter = limt;
  useEffect(() => {
    const incrementer = setInterval(() => {
      seValue((c) => {
        if (c < limiter) {
          if (limiter % 5 === 0) {
            return c + 5;
          } else if (limiter % 2 === 0) {
            return c + 2;
          } else {
            return c + 1;
          }
        }
        clearInterval(incrementer);
        return c;
      });
    }, 0);
  }, [limiter]);
  return [value];
}
