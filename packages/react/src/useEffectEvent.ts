import { useInsertionEffect, useRef, useState } from "react";

const forbiddenInRender = (): never => {
  throw new Error("A function wrapped in useEffectEvent can't be called during rendering.");
};

//* Ponyfill for React 19.2's useEffectEvent (https://react.dev/reference/react/useEffectEvent), as we still support
//* React 18. Based on https://github.com/sanity-io/use-effect-event. Unlike the native hook, the returned function has
//* a stable identity.
export function useEffectEvent<T extends (...args: never[]) => unknown>(fn: T): T {
  const ref = useRef<T>(forbiddenInRender as unknown as T);

  useInsertionEffect(() => {
    ref.current = fn;
  }, [fn]);

  const [stableFn] = useState(() => ((...args) => ref.current(...args)) as T);
  return stableFn;
}
