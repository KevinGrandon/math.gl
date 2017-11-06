import MathArray from './math-array';
import {checkNumber} from './common';

export default class Vector extends MathArray {

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

  dot() {
    let product = 0;
    for (let i = 0; i < this.ELEMENTS; ++i) {
      product += this[i] * this[i];
    }
    return product;
  }

  // MODIFIERS

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

  // Apply general gl-matrix operation with `this` as first two args
  operation(operation, ...args) {
    operation(this, this, ...args);
    return this.check();
  }
}
