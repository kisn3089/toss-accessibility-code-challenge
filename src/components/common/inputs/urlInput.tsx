import React from "react";
import { Input } from "../formLabel/FormLabel.style";
import { ErrorMessge } from "../errorMessage/ErrorMessage";

type UrlInputProps = {
  errorMessage?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;
export const UrlInput = React.forwardRef<HTMLInputElement, UrlInputProps>(
  ({ errorMessage, ...inputProps }, ref) => {
    return (
      <>
        <Input
          ref={ref}
          type="url"
          aria-required="false"
          aria-invalid={Boolean(errorMessage) ? "true" : "false"}
          {...inputProps}
        />
        <ErrorMessge
          ariaId={inputProps["aria-describedby"]}
          message={errorMessage}
        />
      </>
    );
  }
);
