import type { HTMLAttributes } from "react";

type SreenReaderProps = {
  readCondition?: boolean;
} & HTMLAttributes<Element> &
  React.PropsWithChildren;
export const SreenReader = ({
  readCondition = true,
  children,
  ...aria
}: SreenReaderProps) => {
  if (!readCondition) return null;

  return (
    <div {...aria} style={{ display: "none" }}>
      {children}
    </div>
  );
};
