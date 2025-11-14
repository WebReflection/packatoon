# packatoon

[![Coverage Status](https://coveralls.io/repos/github/WebReflection/packatoon/badge.svg?branch=main)](https://coveralls.io/github/WebReflection/packatoon?branch=main)

<sup>**Social Media Photo by [Agenlaku Indonesia](https://unsplash.com/@agenlaku) on [Unsplash](https://unsplash.com/)**</sup>

16 years ago I wrote [json.hpack](https://github.com/WebReflection/json.hpack) for PHP, JS and C#

14 years ago I re-wrote [JSONH](https://github.com/WebReflection/JSONH) for Python, PHP and JS.

A few days ago [TOON](https://github.com/toon-format/toon) non-standard format came out.

*packatoon* module allows anyone to "*pack*" and "*unpack*" homogenous collections which is pretty much what any `.csv` file has done since about forever, except it remains *JSON* compatible like all previous work did before *TOON* came out.

As summary, this module simply uses modern *JS* to accomplish what *TOON* or *JSONH* before did without pretending to be, or do, anything else.

**example**

```js
import { pack, unpack } from 'packatoon';

const collection = [
  { a: 1, b: 2 },
  { a: 3, b: 4 },
];

const packed = pack(collection);

// [2, 'a', 'b', 1, 2, 3, 4]

unpack(packed);
// [{a:1,b:2},{a:3,b:4}]
```

That's it.
