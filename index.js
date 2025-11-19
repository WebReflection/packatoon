// @ts-check
const { keys } = Object;

/**
 * @template T
 * @param {T[]} collection
 * @param {typeof Object.keys | typeof Reflect.ownKeys} own
 * @returns {any[]}
 */
export const pack = (collection, own = keys) => {
  const { length } = collection;
  if (!length) return [];
  const k = own(/** @type {object} */(collection[0]));
  const l = k.length;
  const p = [l, ...k];
  for (let o, j, i = 0; i < length; i++) {
    for (o = collection[i], j = 0; j < l; j++)
      p.push(o[k[j]]);
  }
  return p;
};

/**
 * @template T
 * @param {any[]} flat
 * @returns {T[]}
 */
export const unpack = flat => {
  const collection = [];
  const { length } = flat;
  if (length) {
    const keys = flat[0];
    const start = keys + 1;
    const k = flat.slice(1, start);
    for (let o, j, i = start; i < length; i += keys) {
      for (o = {}, j = 0; j < keys; j++)
        o[k[j]] = flat[i + j];
      collection.push(o);
    }
  }
  return /** @type {T[]} */(collection);
};

/**
 * @template T
 * @param {T[]} collection
 * @returns {number}
 */
export const len = collection => {
  const { length } = collection;
  // @ts-ignore
  return length && ((length - 1) / collection[0]) - 1;
};
