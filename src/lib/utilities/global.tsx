/* eslint-disable */

// TODO needs review!!!

export const get_type = (function () {
  const f = function () {}.constructor;
  const j = {}.constructor;
  const a = [].constructor;
  const s = 'gesi'.constructor;
  const n = (2).constructor;
  const b = true.constructor;
  const t = new Date().constructor;

  return function (value: any) {
    if (value === null) return 'null';
    if (value === undefined) return 'undefined';

    switch (value.constructor) {
      case f:
        return 'function';
      case j:
        return 'json';
      case a:
        return 'array';
      case s:
        return 'string';
      case n:
        return 'number';
      case b:
        return 'boolean';
      case t:
        return 'datetime';
      default:
        return String(typeof value);
    }
  };
})();

export const extend = function (jsonValue: any): {
  [key: string | number]: unknown;
} {
  const hasLevel =
    arguments.length > 0 &&
    get_type(arguments[arguments.length - 1]) == 'number';
  const level = hasLevel ? arguments[arguments.length - 1] : 3;

  const args =
    arguments.length == (hasLevel ? 2 : 1) && get_type(jsonValue) == 'array'
      ? jsonValue
      : arguments;

  const first = args.length > 0 ? args[0] : null;
  const second = args.length > 1 ? args[1] : null;

  if (get_type(first) != 'json' || get_type(second) != 'json') return first;

  for (const o in second) {
    const type = get_type(second[o]);
    if (type == 'undefined') continue;

    if (
      get_type(first[o]) == 'json' &&
      get_type(second[o]) == 'json' &&
      level > 0
    )
      // @ts-expect-error
      first[o] = extend(first[o] || {}, second[o], level - 1);
    else first[o] = second[o];
  }

  const newArgs = [first];
  for (let i = 2, lnt = args.length; i < lnt; ++i) newArgs.push(args[i]);

  // @ts-expect-error
  return extend(newArgs, level);
};

export const zIndex = (function () {
  const _z = function (p: number) {
    return p * 10000;
  };

  return {
    alert: (function () {
      let z = _z(3);
      return function () {
        return ++z;
      };
    })(),
    tooltip: (function () {
      let z = _z(2);
      return function () {
        return ++z;
      };
    })(),
    dialog: (function () {
      let z = _z(1);
      return function () {
        return ++z;
      };
    })(),
  };
})();

export const random = function (min: number, max: number) {
  if (!min || isNaN(min)) min = 0;
  if (max !== 0 && (!max || isNaN(max))) max = 9999999999;
  if (max < min) {
    const t = min;
    min = max;
    max = t;
  }
  if (min == max) return min;
  const lnt = String(max).length;
  return (
    (Number((Math.random() * 10 ** (lnt + 1)).toFixed(0)) % (max - min + 1)) +
    min
  );
};

export const random_str = function (length: number) {
  const str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
  if (get_type(length) != 'number' || length <= 0) length = 10;
  let ret = '';
  for (let i = 0; i < length; ++i) ret += str[random(0, str.length - 1)];
  return ret;
};

export const after_fade_out = function (callback: () => void) {
  if (get_type(callback) == 'function') setTimeout(callback, 200);
};
