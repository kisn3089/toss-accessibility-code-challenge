import "styled-components";
import { Animation, Palette } from "./theme";

declare module "styled-components" {
  export interface DefaultTheme {
    animations: Animation;
    palette: Palette;
  }
}
