import { regex } from "./regex";

export const formValidator = {
  notEmpty(value: string = ""): boolean {
    return value?.trim() !== "";
  },

  emailRegex(value: string = ""): boolean {
    return regex.email.test(value);
  },

  minLength(value: string = "", min: number): boolean {
    return value.trim().length >= min;
  },

  maxLength(value: string = "", max: number): boolean {
    return value.trim().length <= max;
  },

  lengthInRange(value: string = "", min: number, max: number): boolean {
    return this.minLength(value, min) && this.maxLength(value, max);
  },
};
