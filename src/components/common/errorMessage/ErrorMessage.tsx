import { Message } from "./ErrorMessage.style";

type ErrorMessageProps = { showCondition?: boolean } & React.PropsWithChildren;
export const ErrorMessge = ({
  showCondition = true,
  children,
}: ErrorMessageProps) => {
  if (!showCondition) return null;

  return <Message>{children}</Message>;
};
