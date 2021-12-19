import { RefObject } from "react";

export const isClickedOutside = (e: any, ref: RefObject<any>) => {
  if (!ref.current) {
    return true;
  }
  const coords = ref?.current?.getBoundingClientRect();
  if (coords) {
    const { top, right, bottom, left } = coords;
    if (
      e.clientX < left ||
      e.clientX > right ||
      e.clientY < top ||
      e.clientY > bottom
    ) {
      return true;
    }
  }
  return false;
};
