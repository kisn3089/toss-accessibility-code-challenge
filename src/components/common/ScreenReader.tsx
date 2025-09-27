import type { HTMLAttributes } from "react";
import Hidden from "./hidden/Hidden";

type ScreenReaderProps = {
  readCondition?: boolean;
} & HTMLAttributes<Element> &
  React.PropsWithChildren;
export const ScreenReader = ({
  readCondition = true,
  children,
  ...divProps
}: ScreenReaderProps) => {
  if (!readCondition) return null;

  return (
    <Hidden>
      <div {...divProps}>{children}</div>
    </Hidden>
  );
};
