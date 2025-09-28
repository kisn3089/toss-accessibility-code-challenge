import React from "react";
import { Input } from "../formLabel/FormLabel.style";
import { ErrorMessage } from "../errorMessage/ErrorMessage";

type NameInputProps = {
  errorMessage?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;
export const NameInput = React.forwardRef<HTMLInputElement, NameInputProps>(
  ({ errorMessage, ...inputProps }, ref) => {
    return (
      <>
        <Input
          ref={ref}
          type="text"
          minLength={2}
          maxLength={20}
          required
          aria-required="true"
          aria-invalid={Boolean(errorMessage) ? "true" : "false"}
          {...inputProps}
        />
        <ErrorMessage
          ariaId={inputProps["aria-describedby"]}
          message={errorMessage}
        />
      </>
    );
  }
);
