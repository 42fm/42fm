import { useRef } from "react";
import useEffectOnce from "./useEffectOnce";

const useUnmount = (fn: () => any): void => {
  const ref = useRef(fn);

  ref.current = fn;

  useEffectOnce(() => () => ref.current());
};

export default useUnmount;
