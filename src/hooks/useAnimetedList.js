import {
  createRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

export default function useAnimetedList(initialValue = []) {
  const [items, setItems] = useState(initialValue);
  const [pendingRemovalItemsIds, setPendingRemovalItemsIds] = useState([]);

  const animetedRefs = useRef(new Map());
  const animationEndListeners = useRef(new Map());

  const handleAnimationEnd = useCallback((itemId) => {
    const removeListener = animationEndListeners.current.get(itemId);
    removeListener();

    animationEndListeners.current.delete(itemId);
    animetedRefs.current.delete(itemId);

    setItems(
      (prevState) => prevState.filter((item) => item.id !== itemId),
    );
    setPendingRemovalItemsIds(
      (prevState) => prevState.filter((id) => id !== itemId),
    );
  }, []);

  useEffect(() => {
    pendingRemovalItemsIds.forEach((itemId) => {
      const animetedRef = animetedRefs.current.get(itemId);
      const animetedElement = animetedRef?.current;
      const alreadyHasListeners = animationEndListeners.current.has(itemId);

      if (animetedElement && !alreadyHasListeners) {
        const onAnimationEnd = () => handleAnimationEnd(itemId);
        const removeListener = () => {
          animetedElement.removeEventListener('animationend', onAnimationEnd);
        };

        animetedElement.addEventListener('animationend', onAnimationEnd);
        animationEndListeners.current.set(itemId, removeListener);
      }
    });
  }, [pendingRemovalItemsIds, handleAnimationEnd]);

  useEffect(() => {
    const removeListeners = animationEndListeners.current;
    return () => {
      removeListeners.forEach((removeListener) => removeListener());
    };
  }, []);

  const handleRemoveItem = useCallback((id) => {
    setPendingRemovalItemsIds(
      (prevState) => [...prevState, id],
    );
  }, []);

  const getAnimetedRef = useCallback((itemId) => {
    let animetedRef = animetedRefs.current.get(itemId);

    if (!animetedRef) {
      animetedRef = createRef();
      animetedRefs.current.set(itemId, animetedRef);
    }

    return animetedRef;
  }, []);

  const renderList = useCallback((renderItem) => (
    items.map((item) => {
      const isLeaving = pendingRemovalItemsIds.includes(item.id);
      const animetedRef = getAnimetedRef(item.id);

      return renderItem(item, { isLeaving, animetedRef });
    })
  ), [items, pendingRemovalItemsIds, getAnimetedRef]);

  return {
    items,
    setItems,
    handleRemoveItem,
    renderList,
  };
}
