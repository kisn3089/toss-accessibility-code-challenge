import type { DefaultTheme } from "styled-components";
import { animation } from "./animation";

export type Animation = typeof animation;
export type Palette = typeof palette;

const animations = {
  fadeIn: animation.fadeIn,
  slideIn: animation.slideIn,
};

const palette = {
  white: "#FFFFFF",
  black: "#000000",
  gray_light: "#E5E2EC",
  gray_deep: "#7F8084",
  blue: "#4267A1",
  red: "#CD2640",
};

export const theme: DefaultTheme = {
  animations,
  palette,
};
