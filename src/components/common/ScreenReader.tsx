import type { HTMLAttributes } from "react";

type SreenReaderProps = HTMLAttributes<Element> & React.PropsWithChildren;
export const SreenReader = ({ children, ...aria }: SreenReaderProps) => {
  return (
    <div {...aria} style={{ display: "none" }}>
      {children}
    </div>
  );
};
