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

const { stringify } = JSON;

const safe = str => (
  typeof str === 'string' && /[,"]/.test(str) ? stringify(str) : str
);

/**
 * @template T
 * @param {string} name the collection name
 * @param {T[]} collection a packed or linear collection
 * @param {boolean} [packed=true] whether the collection is packed or linear
 * @returns {string} a TOON like string representation of the collection
 */
export const toon = (name, collection, packed = true) => {
  const l = packed ? len(collection) : collection.length;
  const output = [`${safe(name)}[${l}]`];
  if (l) {
    if (packed) {
      output[0] += `{${collection.slice(1, l + 1).map(safe).join(',')}}:`;
      for (let i = l + 1; i < collection.length;) {
        const row = [];
        for (let j = 0; j < l; j++)
          row.push(safe(collection[i + j]));
        output.push('  ' + row.join(','));
        i += l;
      }
    }
    else {
      output[0] += `: ${collection.map(safe).join(',')}`;
    }
  }
  else output[0] += ':';
  return output.join('\n');
};
