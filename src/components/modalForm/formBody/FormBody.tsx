import React, { useTransition } from "react";
import { FormLayout } from "./FormBody.style";
import { WithLabel } from "../withLabel/WithLabel";
import { Input, Select } from "../withLabel/WithLabel.style";
import { validtor } from "../../../utils/validation/validator";
import { SreenReader } from "../../common/ScreenReader";

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
    <FormLayout
      role="form"
      aria-label="신청서"
      onSubmit={submitForm}
      noValidate>
      <WithLabel label="이름 / 닉네임">
        {(label) => (
          <>
            <Input
              id={label}
              type="text"
              name="name"
              value={formData.name}
              onChange={changeFormData}
              min={2}
              maxLength={20}
              tabIndex={2}
              aria-required="true"
              aria-invalid={validation.name ? "false" : "true"}
              aria-describedby={validation.name ? undefined : "name-error"}
            />
            {!validation.name && (
              <SreenReader id="name-error" role="alert" aria-live="polite">
                이름을 입력해주세요
              </SreenReader>
            )}
          </>
        )}
      </WithLabel>
      <WithLabel label="이메일">
        {(label) => (
          <>
            <Input
              id={label}
              type="email"
              name="email"
              value={formData.email}
              onChange={changeFormData}
              min={5}
              maxLength={50}
              tabIndex={3}
              aria-required="true"
              aria-invalid={validation.email ? "false" : "true"}
              aria-describedby={validation.email ? undefined : "email-error"}
            />
            {!validation.email && (
              <SreenReader id="email-error" role="alert" aria-live="polite">
                이메일 형식으로 입력해주세요
              </SreenReader>
            )}
          </>
        )}
      </WithLabel>
      <WithLabel label="FE 경력 연차">
        {(label) => (
          <>
            <Select
              id={label}
              name="experience"
              onChange={changeFormData}
              value={formData.experience}
              tabIndex={4}
              aria-invalid={validation.experience ? "false" : "true"}
              aria-describedby={
                validation.experience ? undefined : "experience-error"
              }
              aria-label="FE 경력 연차"
              aria-required="true">
              <option value="">선택하세요</option>
              <option value="junior">{"0-3년차"}</option>
              <option value="mid">{"4-7년차"}</option>
              <option value="senior">{"8년차 이상"}</option>
            </Select>
            {!validation.experience && (
              <SreenReader
                id="experience-error"
                role="alert"
                aria-live="polite">
                경력 연차를 선택해주세요
              </SreenReader>
            )}
          </>
        )}
      </WithLabel>
      <WithLabel label="GitHub 링크 (선택)">
        {(label) => (
          <Input
            id={label}
            type="url"
            name="github"
            value={formData.github}
            onChange={changeFormData}
            tabIndex={5}
            aria-label="GitHub 링크 (선택)"
            aria-invalid="false"
            aria-describedby="github-hint"
          />
        )}
      </WithLabel>
      <SreenReader id="github-hint">
        GitHub 프로필 링크를 입력하세요
      </SreenReader>
      {children(canSubmit)}
    </FormLayout>
  );
};
