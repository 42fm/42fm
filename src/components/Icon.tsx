import { defaultIconProps } from "@/utils/icon";
import { cloneElement, JSX } from "react";
import { useTheme } from "styled-components";

interface Props {
  children: JSX.Element;
}

function Icon({ children, ...rest }: Props) {
  let theme = useTheme();
  return cloneElement(children, { ...defaultIconProps, fill: theme.tooltip.background, ...rest });
}

export default Icon;
