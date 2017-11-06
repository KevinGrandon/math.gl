// Copyright (c) 2017 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import {config, formatValue, equals, checkNumber} from './common';

export default class MathArray extends Array {

  clone() {
    const Subclass = this.constructor;
    const clone = new Subclass().copy(this);
    clone.check();
    return clone;
  }

  copy(array) {
    for (let i = 0; i < this.ELEMENTS; ++i) {
      this[i] = array[i];
    }
    return this.check();
  }

  set(...args) {
    for (let i = 0; i < this.ELEMENTS; ++i) {
      this[i] = args[i] || 0;
    }
    return this.check();
  }

  fromArray(array, offset = 0) {
    for (let i = 0; i < this.ELEMENTS; ++i) {
      this[i] = array[i + offset];
    }
    return this.check();
  }

  toString() {
    return this.formatString(config);
  }

  formatString(opts) {
    let string = '';
    for (let i = 0; i < this.ELEMENTS; ++i) {
      string += (i > 0 ? ', ' : '') + formatValue(this[i], opts);
    }
    return `${opts.printTypes ? this.constructor.name : ''}[${string}]`;
  }

  toArray(array = [], offset = 0) {
    for (let i = 0; i < this.ELEMENTS; ++i) {
      array[offset + i] = this[i];
    }
    return array;
  }

  toFloat32Array() {
    return new Float32Array(this);
  }

  equals(array) {
    if (!array || this.length !== array.length) {
      return false;
    }
    for (let i = 0; i < this.ELEMENTS; ++i) {
      if (!equals(this[i], array[i])) {
        return false;
      }
    }
    return true;
  }

  exactEquals(array) {
    if (!array || this.length !== array.length) {
      return false;
    }
    for (let i = 0; i < this.ELEMENTS; ++i) {
      if (this[i] !== array[i]) {
        return false;
      }
    }
    return true;
  }

  // ACCESSORS

  // NOTE: `length` is a reserved word for Arrays, so we can't use `v.length()`
  // Offer `len` and `magnitude`

  len() {
    return Math.sqrt(this.lengthSquared());
  }

  magnitude() {
    return Math.sqrt(this.lengthSquared());
  }

  lengthSquared() {
    let length = 0;
    if (length !== 0) {
      for (let i = 0; i < this.ELEMENTS; ++i) {
        length += this[i] * this[i];
      }
    }
    return checkNumber(this);
  }

  distance(mathArray) {
    return Math.sqrt(this.distanceSquared(mathArray));
  }

  distanceSquared(mathArray) {
    let length = 0;
    for (let i = 0; i < this.ELEMENTS; ++i) {
      const dist = this[i] - mathArray[i];
      length += dist * dist;
    }
    return checkNumber(length);
  }

  // dot() {
  //   let product = 0;
  //   for (let i = 0; i < this.ELEMENTS; ++i) {
  //     product += this[i] * this[i];
  //   }
  //   return product;
  // }

  // MODIFIERS

  negate() {
    for (let i = 0; i < this.ELEMENTS; ++i) {
      this[i] = -this[i];
    }
    return this.check();
  }

  inverse() {
    for (let i = 0; i < this.ELEMENTS; ++i) {
      this[i] = 1 / this[i];
    }
    return this.check();
  }

  normalize() {
    const length = this.magnitude();
    if (length !== 0) {
      for (let i = 0; i < this.ELEMENTS; ++i) {
        this[i] /= length;
      }
    }
    return this.check();
  }

  // OPERATIONS

  add(...vectors) {
    for (const vector of vectors) {
      for (let i = 0; i < this.ELEMENTS; ++i) {
        this[i] += vector[i];
      }
    }
    return this.check();
  }

  subtract(...vectors) {
    for (const vector of vectors) {
      for (let i = 0; i < this.ELEMENTS; ++i) {
        this[i] -= vector[i];
      }
    }
    return this.check();
  }

  multiply(...vectors) {
    for (const vector of vectors) {
      for (let i = 0; i < this.ELEMENTS; ++i) {
        this[i] *= vector[i];
      }
    }
    return this.check();
  }

  divide(...vectors) {
    for (const vector of vectors) {
      for (let i = 0; i < this.ELEMENTS; ++i) {
        this[i] /= vector[i];
      }
    }
    return this.check();
  }

  // A single number is multiplied with all element, an array calls this.multiply
  scale(scale) {
    if (Number.isFinite(scale)) {
      for (let i = 0; i < this.ELEMENTS; ++i) {
        this[i] *= scale;
      }
      return this.check();
    }
    return this.multiply(scale);
  }

  scaleAndAdd(vector, scale) {
    checkNumber(scale);
    for (let i = 0; i < this.ELEMENTS; ++i) {
      this[i] += vector[i] * scale;
    }
    return this.check();
  }

  lerp(vector, coeff) {
    for (let i = 0; i < this.ELEMENTS; ++i) {
      const coord = this[i];
      this[i] = coord + coeff * (vector[0] - coord);
    }
    return this.check();
  }

  // Apply general gl-matrix operation with `this` as first two args
  operation(operation, ...args) {
    operation(this, this, ...args);
    return this.check();
  }

  // Debug checks

  validate(array = this) {
    let valid = array && array.length === this.ELEMENTS;
    for (let i = 0; i < this.ELEMENTS; ++i) {
      valid = valid && Number.isFinite(array[i]);
    }
    return valid;
  }

  check(array = this) {
    if (config.debug && !this.validate(array)) {
      throw new Error(`Invalid ${this.constructor.name}`);
    }
    return this;
  }
}
