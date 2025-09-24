export type Experience = "junior" | "mid" | "senior";
export interface ModalFormData {
  name: string;
  email: string;
  experience: Experience;
  github?: string;
}

export type Validations = [
  React.RefObject<HTMLInputElement | HTMLSelectElement | null>,
  (value: string) => boolean
][];
