import "styled-components";
import { animation } from "./animation";

type AnimationType = typeof animation;

declare module "styled-components" {
  export interface DefaultTheme {
    animations: AnimationType;
  }
}
