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

// gl-matrix is too big. Cherry-pick individual imports from stack.gl version
/* eslint-disable camelcase */
import vec2_cross from 'gl-vec2/cross';

export function validateVector2(v) {
  return v.length === 2 &&
    Number.isFinite(v[0]) && Number.isFinite(v[1]);
}

export default class Vector2 extends Vector {

  // Getters/setters
  /* eslint-disable no-multi-spaces, brace-style, no-return-assign */
  get ELEMENTS() { return 2; }
  get x()      { return this[0]; }
  set x(value) { return this[0] = checkNumber(value); }
  get y()      { return this[1]; }
  set y(value) { return this[1] = checkNumber(value); }
  /* eslint-disable no-multi-spaces, brace-style, no-return-assign */

  // Creates a new, empty vec2
  constructor(x = 0, y = 0) {
    super();
    if (Array.isArray(x) && arguments.length === 1) {
      this.copy(x);
    } else {
      this.set(x, y);
    }
  }

  set(x, y) {
    this[0] = x;
    this[1] = y;
    return this.check();
  }

  // inherited
  // negate()
  // normalize()
  // dot(vector)

  // add(...vectors)
  // subtract(...vectors)
  // multiply(...vectors)
  // divide(...vectors)
  // scale(numberOrVector)
  // scaleAndAdd(number, vector)
  // lerp

  cross(vector) {
    vec2_cross(this, this, vector);
    return this.check();
  }

  horizontalAngle() {
    return Math.atan2(this.y, this.x);
  }

  verticalAngle() {
    return Math.atan2(this.x, this.y);
  }
}
