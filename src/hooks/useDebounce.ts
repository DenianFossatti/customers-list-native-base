import { useEffect, useMemo, useRef } from 'react';
import debounce from 'lodash/debounce';

const useDebounce = (func: any, wait: number) => {
  const throttle = useRef<any>();

  useEffect(() => {
    const debounced = debounce(func, wait, { leading: false });
    throttle.current = debounced;

    return () => {
      debounced.cancel();
    };
  }, [func, wait]);

  return useMemo(() => {
    const callback = (...args: any[]) => {
      return throttle.current(...args);
    };

    callback.cancel = () => {
      if (throttle.current) {
        throttle.current.cancel();
      }
    };

    callback.flush = () => {
      if (throttle.current) {
        throttle.current.flush();
      }
    };

    return callback;
  }, []);
};

export default useDebounce;
