import React, { useTransition } from "react";
import { FormLayout } from "./FormBody.style";
import { WithLabel } from "../withLabel/WithLabel";
import { Input, Select } from "../withLabel/WithLabel.style";
import { validtor } from "../../../utils/validation/validator";

type Experience = "junior" | "mid" | "senior" | "";
interface FormData {
  name: string;
  email: string;
  experience: string;
  github?: Experience;
}

const initialFormData: FormData = {
  name: "",
  email: "",
  experience: "",
  github: "",
};

type FormBodyProps = { children: (canSubmit: boolean) => React.ReactNode };
export const FormBody = ({ children }: FormBodyProps) => {
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = React.useState<FormData>(initialFormData);

  const validation = {
    name: validtor.isNotEmpty(formData.name),
    email: validtor.isEmailForm(formData.email),
    experience: validtor.isNotEmpty(formData.experience),
  };

  const canSubmit = Object.values(validation).every(Boolean);

  const changeFormData = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted!", formData);

    startTransition(() => {});
  };

  return (
    <FormLayout onSubmit={submitForm} noValidate>
      <WithLabel label="이름 / 닉네임">
        {(label) => (
          <Input
            id={label}
            type="text"
            aria-required
            name="name"
            value={formData.name}
            onChange={changeFormData}
            aria-invalid={validation.name ? "false" : "true"}
            aria-errormessage="name-error"
            min={2}
            maxLength={20}
          />
        )}
      </WithLabel>
      <WithLabel label="이메일">
        {(label) => (
          <Input
            id={label}
            type="email"
            aria-required
            name="email"
            value={formData.email}
            onChange={changeFormData}
            aria-invalid={validation.email ? "false" : "true"}
            aria-errormessage="email-error"
            min={5}
            maxLength={50}
          />
        )}
      </WithLabel>
      <WithLabel label="FE 경력 연차">
        {(label) => (
          <Select
            id={label}
            name="experience"
            onChange={changeFormData}
            value={formData.experience}
            aria-invalid={validation.experience ? "false" : "true"}
            aria-errormessage="experience-error"
            aria-label="FE 경력 연차"
            aria-required>
            <option value="">선택하세요</option>
            <option value="junior">{"0-3년차"}</option>
            <option value="mid">{"4-7년차"}</option>
            <option value="senior">{"8년차 이상"}</option>
          </Select>
        )}
      </WithLabel>
      <WithLabel label="GitHub 링크 (선택)">
        {(label) => (
          <Input
            id={label}
            type="text"
            name="github"
            value={formData.github}
            onChange={changeFormData}
            aria-invalid={formData.github ? "false" : "true"}
            aria-errormessage="github-error"
          />
        )}
      </WithLabel>
      {children(canSubmit)}
    </FormLayout>
  );
};
