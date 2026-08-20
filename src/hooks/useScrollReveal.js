import { useEffect, useRef, useState } from 'react';

export function useScrollReveal(options = {}) {
  const { threshold = 0.1, rootMargin = '0px', once = true } = options;
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return [ref, isVisible];
}

export function useStaggerReveal(itemCount, options = {}) {
  const { threshold = 0.1, staggerDelay = 80 } = options;
  const [ref, isVisible] = useScrollReveal({ threshold });
  const [visibleItems, setVisibleItems] = useState(new Set());

  useEffect(() => {
    if (!isVisible) return;
    const timers = [];
    for (let i = 0; i < itemCount; i++) {
      timers.push(
        setTimeout(() => {
          setVisibleItems((prev) => new Set([...prev, i]));
        }, i * staggerDelay)
      );
    }
    return () => timers.forEach(clearTimeout);
  }, [isVisible, itemCount, staggerDelay]);

  return [ref, visibleItems];
}

export function useCountUp(end, duration = 1500, startOnVisible = false) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(!startOnVisible);

  useEffect(() => {
    if (!started) return;
    const numEnd = parseFloat(end);
    if (isNaN(numEnd)) { setCount(end); return; }

    let startTime = null;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * numEnd));
      if (progress < 1) requestAnimationFrame(animate);
      else setCount(numEnd);
    };
    requestAnimationFrame(animate);
  }, [started, end, duration]);

  return [count, () => setStarted(true)];
}
