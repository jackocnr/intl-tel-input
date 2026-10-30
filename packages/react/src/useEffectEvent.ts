/*! @license
 * useEffectEvent ponyfill, adapted from https://github.com/sanity-io/use-effect-event
 *
 * MIT License
 *
 * Copyright (c) 2025 Sanity
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { useInsertionEffect, useRef, useState } from "react";

const forbiddenInRender = (): never => {
  throw new Error("A function wrapped in useEffectEvent can't be called during rendering.");
};

//* Ponyfill for React 19.2's useEffectEvent (https://react.dev/reference/react/useEffectEvent), as we still support
//* React 18. Unlike the native hook, the returned function has a stable identity.
export function useEffectEvent<T extends (...args: never[]) => unknown>(fn: T): T {
  const ref = useRef<T>(forbiddenInRender as unknown as T);

  useInsertionEffect(() => {
    ref.current = fn;
  }, [fn]);

  const [stableFn] = useState(() => ((...args) => ref.current(...args)) as T);
  return stableFn;
}
