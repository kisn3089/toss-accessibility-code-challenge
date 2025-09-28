import React from "react";
import { Select } from "../formLabel/FormLabel.style";
import { ErrorMessge } from "../errorMessage/ErrorMessage";

type SelectInputProps = {
  errorMessage?: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>;
export const SelectInput = React.forwardRef<
  HTMLSelectElement,
  SelectInputProps
>(({ errorMessage, ...selectProps }, ref) => {
  return (
    <>
      <Select
        ref={ref}
        required
        aria-required="true"
        aria-label="FE 경력 연차 선택란"
        aria-invalid={Boolean(errorMessage) ? "false" : "true"}
        {...selectProps}>
        <option value="">{"선택하세요"}</option>
        <option value="junior">{"0-3년차"}</option>
        <option value="mid">{"4-7년차"}</option>
        <option value="senior">{"8년차 이상"}</option>
      </Select>
      <ErrorMessge
        ariaId={selectProps["aria-describedby"]}
        message={errorMessage}
      />
    </>
  );
});
