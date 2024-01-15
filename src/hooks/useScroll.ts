import { useRef } from 'react';

function useScroll(width: number) {
  const scrollRef = useRef<HTMLElement>(null);

  const scrollLeft = () => {
    if (!scrollRef.current) return;
    const { scrollLeft } = scrollRef.current;
    const nextScrollLeft = scrollLeft - width;
    scrollRef.current.scrollTo({ left: nextScrollLeft, behavior: 'smooth' });
  };

  const scrollRight = () => {
    if (!scrollRef.current) return;
    const { scrollLeft } = scrollRef.current;
    const nextScrollLeft = scrollLeft + width;
    scrollRef.current.scrollTo({ left: nextScrollLeft, behavior: 'smooth' });
  };

  return { scrollRef, scrollLeft, scrollRight };
}

export default useScroll;
