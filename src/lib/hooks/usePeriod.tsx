/**
 * every time the parameter 'value' changes, the return value of the hook will remain true
 * for a period equal to the 'duration' parameter, only if 'value' if true or is a positive number
 */

import { useState, useEffect } from 'react';
import { GlobalUtilities } from '../utilities';

export type IUsePeriod = (
  // eslint-disable-next-line no-unused-vars
  value: number | boolean,
  // eslint-disable-next-line no-unused-vars
  props?: { duration?: number }
) => boolean;

const check = (value: any) => {
  return (
    value === true ||
    (GlobalUtilities.get_type(value) === 'number' && value > 0)
  );
};

const usePeriod: IUsePeriod = (value, { duration = 500 } = {}) => {
  const [inPeriod, setInPeriod] = useState(check(value));

  let to: NodeJS.Timeout;

  useEffect(() => {
    if (to) clearTimeout(to);

    setInPeriod(check(value));

    to = setTimeout(() => setInPeriod(false), duration);

    // cleanup
    return () => clearTimeout(to);
  }, [value]);

  return inPeriod;
};

export default usePeriod;
