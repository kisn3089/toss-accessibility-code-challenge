import type { RequiredKeys } from "../../../types/hepler.type";

export type Experience = "junior" | "mid" | "senior";
export interface ModalFormData {
  name: string;
  email: string;
  experience: Experience;
  github?: string;
}

export type SubmitStatus = "idle" | "submitting" | "error" | "success";
export type Validations = [
  React.RefObject<HTMLInputElement | HTMLSelectElement | null>,
  (value: string) => boolean
][];

export const errorMessages = {
  name: "이름을 2글자 이상으로 입력해주세요.",
  email: "이메일 형식에 올바르게 입력해주세요",
  experience: "경력 연차를 선택해주세요",
} as const;

export type ErrorKeys = keyof typeof errorMessages;
export type ErrorMessages = (typeof errorMessages)[ErrorKeys];
export type Errors = Partial<
  Record<RequiredKeys<ModalFormData>, ErrorMessages>
>;
