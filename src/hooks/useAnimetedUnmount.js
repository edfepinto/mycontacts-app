import { useEffect, useRef, useState } from 'react';

export default function useAnimetedUnmount(visible) {
  const [shouldRender, setShouldRender] = useState(visible);
  const animetedElementRef = useRef(null);

  useEffect(() => {
    if (visible) setShouldRender(true);

    function handleAnimationEnd() {
      setShouldRender(false);
    }

    const elementRef = animetedElementRef.current;

    if (!visible && elementRef) {
      elementRef.addEventListener('animationend', handleAnimationEnd);
    }

    return () => {
      if (elementRef) {
        elementRef.removeEventListener(
          'animationend',
          handleAnimationEnd,
        );
      }
    };
  }, [visible]);

  return {
    shouldRender,
    animetedElementRef,
  };
}
