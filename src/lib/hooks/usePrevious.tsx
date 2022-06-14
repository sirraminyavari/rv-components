import { useRef, useEffect } from 'react';

function usePrevious<T>(value: T): T {
  const ref = useRef<typeof value>(value);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export default usePrevious;
