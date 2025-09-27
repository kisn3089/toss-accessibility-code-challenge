import { Message, Right } from "./ErrorMessage.style";

type ErrorMessageProps = {
  message?: string;
  ariaId?: string;
};

export const ErrorMessage = ({ message, ariaId }: ErrorMessageProps) => {
  return (
    <Right>
      <Message id={ariaId} role="alert" aria-live="assertive">
        {/** " " = layout-shift 방지 */}
        {message || " "}
      </Message>
    </Right>
  );
};
