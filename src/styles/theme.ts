import type { DefaultTheme } from "styled-components";
import { animation } from "./animation";

const animations = {
  fadeIn: animation.fadeIn,
  slideIn: animation.slideIn,
};

export const theme: DefaultTheme = {
  animations,
};
