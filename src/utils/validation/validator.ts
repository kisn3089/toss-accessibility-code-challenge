import { regex } from "./regex";

export const formValidator = {
  notEmpty: (value: string = ""): boolean => {
    return value?.trim() !== "";
  },

  emailRegex: (value: string = ""): boolean => {
    return regex.email.test(value);
  },

  minLength: (value: string = "", min: number): boolean => {
    return value.trim().length >= min;
  },

  maxLength: (value: string = "", max: number): boolean => {
    return value.trim().length <= max;
  },

  lengthInRange: (value: string = "", min: number, max: number): boolean => {
    return (
      formValidator.minLength(value, min) && formValidator.maxLength(value, max)
    );
  },

  nameValidator: (name: string = "") => {
    return (
      formValidator.notEmpty(name) && formValidator.lengthInRange(name, 2, 20)
    );
  },

  emailValidator: (email: string = "") => {
    return (
      formValidator.emailRegex(email) &&
      formValidator.lengthInRange(email, 5, 50)
    );
  },
};
