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

import Vector from './vector';
import {checkNumber} from './common';

export function validateVector4(v) {
  return v.length === 4 &&
    Number.isFinite(v[0]) && Number.isFinite(v[1]) &&
    Number.isFinite(v[2]) && Number.isFinite(v[3]);
}

export default class Vector4 extends Vector {
  // Getters/setters
  /* eslint-disable no-multi-spaces, brace-style, no-return-assign */
  get ELEMENTS() { return 4; }
  get x()      { return this[0]; }
  set x(value) { return this[0] = checkNumber(value); }
  get y()      { return this[1]; }
  set y(value) { return this[1] = checkNumber(value); }
  get z()      { return this[2]; }
  set z(value) { return this[2] = checkNumber(value); }
  get w()      { return this[3]; }
  set w(value) { return this[3] = checkNumber(value); }
  /* eslint-enable no-multi-spaces, brace-style, no-return-assign */

  // Creates a new, empty vec4
  constructor(x = 0, y = 0, z = 0, w = 0) {
    super();
    if (Array.isArray(x) && arguments.length === 1) {
      this.copy(x);
    } else {
      this.set(x, y, z, w);
    }
  }

  set(x, y, z, w) {
    this[0] = x;
    this[1] = y;
    this[2] = z;
    this[3] = w;
    return this.check();
  }

  // distance(vector)
  // negate()
  // inverse()
  // normalize()
  // dot(vector)

  // add(...vectors)
  // subtract(...vectors)
  // multiply(...vectors)
  // divide(...vectors)
  // scale(numberOrVector)
  // scaleAndAdd(number, vector)
  // lerp

  /*
  ceil() {
    vec4_ceil(this, this);
    return this.check();
  }

  floor() {
    vec4_floor(this, this);
    return this.check();
  }

  min() {
    vec4_min(this, this);
    return this.check();
  }

  max() {
    vec4_max(this, this);
    return this.check();
  }

  hermite(scale) {
    vec4_hermite(this, this, scale);
    return this.check();
  }

  bezier(scale) {
    vec4_bezier(this, this, scale);
    return this.check();
  }

  random(scale) {
    vec4_random(this, this, scale);
    return this.check();
  }

  rotateX(origin, angle) {
    vec4_rotateX(this, this, origin, angle);
    return this.check();
  }

  rotateY(origin, angle) {
    vec4_rotateY(this, this, origin, angle);
    return this.check();
  }

  rotateZ(origin, angle) {
    vec4_rotateZ(this, this, origin, angle);
    return this.check();
  }
  */
}
