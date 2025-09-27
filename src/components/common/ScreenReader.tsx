import type { HTMLAttributes } from "react";

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
    <div {...divProps} style={{ display: "none" }}>
      {children}
    </div>
  );
};
