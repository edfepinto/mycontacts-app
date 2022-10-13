import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

export default function useSafeAsyncState(initialState) {
  const [state, setState] = useState(initialState);

  const isMounted = useRef();

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  const setSafeAsyncState = useCallback((data) => {
    if (isMounted.current) setState(data);
  }, []);

  return [state, setSafeAsyncState];
}
