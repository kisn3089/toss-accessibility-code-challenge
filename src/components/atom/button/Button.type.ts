import type { ButtonHTMLAttributes } from "react";

// TODO: Mode 좀 더 직관적인 네이밍으로 변경 필요
export type Mode = "primary" | "secondary";

export type Size = "full" | "fit";
export type ColorProperties = { color: string; backgroundColor: string };

export type ButtonProps = {
  mode?: Mode;
  size?: Size;
  customStyle?: React.CSSProperties;
} & React.PropsWithChildren & {
    screenReader?: never;
  } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "style">;
