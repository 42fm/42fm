import { useRef } from "react";

export function useRenderCount(): number {
  return ++useRef(0).current;
}
