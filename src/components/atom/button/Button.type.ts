import type { ButtonHTMLAttributes } from "react";

// TODO: Mode 좀 더 직관적인 네이밍으로 변경 필요
export type Mode = "primary" | "secondary";

export type Size = "medium" | "large";
export type ColorProperties = { color: string; backgroundColor: string };

export type ButtonProps = {
  mode?: Mode;
  customStyle?: React.CSSProperties;
} & React.PropsWithChildren &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "style">;
