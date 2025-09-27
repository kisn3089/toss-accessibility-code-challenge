import { ScreenReader } from "../ScreenReader";
import { Message, Right } from "./ErrorMessage.style";

type ErrorMessageProps = {
  message?: string;
  ariaId?: string;
};

export const ErrorMessge = ({ message, ariaId }: ErrorMessageProps) => {
  return (
    <Right>
      <Message>
        <ScreenReader id={ariaId} role="alert" aria-live="assertive">
          {message}
        </ScreenReader>
        {/** message = " " 오류 메시지 노출 시 layout-shift 방지 */}
        {message || " "}
      </Message>
    </Right>
  );
};
