import { ForwardedRef, MutableRefObject, useEffect, useRef } from 'react';

const useCombinedRefs = <T,>(...refs: (ForwardedRef<T> | MutableRefObject<T>)[]) => {
  const targetRef = useRef<T>(null);

  useEffect(() => {
    refs.forEach((ref) => {
      if (!ref) return;

      if (typeof ref === 'function') {
        ref(targetRef.current);
      } else {
        ref.current = targetRef.current;
      }
    });
  }, [refs]);

  return targetRef;
};

export default useCombinedRefs;
