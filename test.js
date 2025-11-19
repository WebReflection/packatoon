import { pack, unpack, len } from './index.js';

const { stringify } = JSON;

const empty = [];
const single = [{ a: 1 }];
const double = [{ a: 1 }, { a: 2 }];
const multi = [{ a: 1, b: 2 }, { a: 3, b: 4 }];

const assert = (actual, expected) => {
  if (actual !== expected) {
    throw new Error(`Expected ${expected} but got ${actual}`);
  }
};

assert(len(empty), 0);
assert(len(pack(single)), 1);
assert(len(pack(double)), 2);
assert(len(pack(multi)), 2);

assert(stringify(pack(empty)), stringify([]));
assert(stringify(pack(single)), stringify([1, 'a', 1]));
assert(stringify(pack(double)), stringify([1, 'a', 1, 2]));
assert(stringify(pack(multi)), stringify([2, 'a', 'b', 1, 2, 3, 4]));
assert(pack([{[Symbol.for('a')]:1}], Reflect.ownKeys)[2], 1);
assert(pack([{[Symbol.for('a')]:1}], Reflect.ownKeys)[1], Symbol.for('a'));
assert(pack([{[Symbol.for('a')]:1}], Reflect.ownKeys).length, 3);

assert(stringify(unpack([])), stringify(empty));
assert(stringify(unpack([])), stringify(empty));
assert(stringify(unpack([1, 'a', 1])), stringify(single));
assert(stringify(unpack([1, 'a', 1, 2])), stringify(double));
assert(stringify(unpack([2, 'a', 'b', 1, 2, 3, 4])), stringify(multi));
assert(unpack([1, Symbol.for('a'), 1])[0][Symbol.for('a')], 1);
