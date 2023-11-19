import React, { useEffect, useState, useCallback } from "react";

interface Props {
  dom: React.RefObject<HTMLDivElement>;
}

function useObserver({ dom }: Props) {
  const [intersect, setIntersect] = useState<boolean>(false);

  const handleIntersect = useCallback(
    ([entry]: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      if (entry.isIntersecting && !intersect) {
        setIntersect(true);
      } else {
        setIntersect(false);
      }
    },
    []
  );

  useEffect(() => {
    const { current } = dom!;
    let observer: IntersectionObserver;

    if (current) {
      observer = new IntersectionObserver(handleIntersect, {
        threshold: 1,
      });
      observer.observe(current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return intersect;
}

export default useObserver;
