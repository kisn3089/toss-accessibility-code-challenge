import { DisplayNone } from "./Hidden.style";

export const Hidden = ({ children }: React.PropsWithChildren) => {
  return <DisplayNone>{children}</DisplayNone>;
};

export default Hidden;
