import React from "react";
import { Input } from "../formLabel/FormLabel.style";
import { ErrorMessage } from "../errorMessage/ErrorMessage";

type EmailInputProps = {
  errorMessage?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;
export const EmailInput = React.forwardRef<HTMLInputElement, EmailInputProps>(
  ({ errorMessage, ...inputProps }, ref) => {
    return (
      <>
        <Input
          ref={ref}
          type="email"
          minLength={5}
          maxLength={50}
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
