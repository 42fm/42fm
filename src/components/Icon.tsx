import { defaultIconProps } from "@/utils/icon";
import { cloneElement, JSX } from "react";

interface Props {
  children: JSX.Element;
}

function Icon({ children, ...rest }: Props) {
  return cloneElement(children, { ...rest, ...defaultIconProps });
}

export default Icon;
