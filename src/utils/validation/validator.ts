import { regex } from "./regex";

export const validator = {
  isNotEmpty: (value: string = ""): boolean => value?.trim() !== "",
  isEmailForm: (value: string = ""): boolean => regex.email.test(value),
};
