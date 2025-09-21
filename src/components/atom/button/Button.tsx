import { theme } from "../../../styles/theme";
import { ButtonAtom } from "./Button.style";
import type { ButtonProps, Mode, ColorProperties } from "./Button.type";

// TODO: Mode 좀 더 직관적인 네이밍으로 변경 필요
const modeProperties: Record<Mode, ColorProperties> = {
  primary: {
    color: theme.palette.white,
    backgroundColor: theme.palette.blue,
  },
  secondary: {
    color: theme.palette.black,
    backgroundColor: theme.palette.gray_light,
  },
} as const;

const Button = ({
  children,
  mode = "primary",
  customStyle,
  ...buttonProps
}: ButtonProps) => {
  const style = { ...modeProperties[mode], ...customStyle };

  return (
    <ButtonAtom {...buttonProps} style={style}>
      {children}
    </ButtonAtom>
  );
};

export default Button;
