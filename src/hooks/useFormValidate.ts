import React from "react";
import type { Validations } from "../components/modalForm/formBody/FormBody.type";

export const useFormValidate = <ErrorMessages extends Record<string, string>>(
  validations: Validations,
  errorMessages: ErrorMessages
) => {
  const [errors, setErrors] = React.useState<Partial<ErrorMessages>>();

  const validator = (): boolean => {
    const validationErrors: Partial<ErrorMessages> = {};
    const isFormValid = validations.every(([ref, validator]) => {
      const hasPassed = validator(ref.current?.value ?? "");
      if (hasPassed) return true;

      const invalidKey = ref.current?.name as keyof ErrorMessages;
      validationErrors[invalidKey] = errorMessages[invalidKey];
      ref.current?.focus();
      return false;
    });

    if (Object.values(validationErrors).length > 0) setErrors(validationErrors);
    return isFormValid;
  };

  return {
    errors,
    validator,
    clearErrors: () => setErrors({}),
  };
};
