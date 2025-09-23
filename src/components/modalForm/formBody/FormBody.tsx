import React from "react";
import { FormLayout } from "./FormBody.style";
import { WithLabel } from "../../common/withLabel/WithLabel";
import { Input, Select } from "../../common/withLabel/WithLabel.style";
import { formValidator } from "../../../utils/validation/validator";
import { SreenReader } from "../../common/ScreenReader";
import { useModal } from "../../modal/provider/ModalProvider";
import { sleep } from "../../../utils/sleep";
import type { RequiredKeys } from "../../../types/hepler.type";
import {
  errorMessages,
  type Errors,
  type Experience,
  type ModalFormData,
  type Validations,
} from "./FormBody.type";
import { WithLabel } from "../../common/withLabel/WithLabel";
import { Input, Select } from "../../common/withLabel/WithLabel.style";

type FormBodyProps = {
  onResolve: <T>(returnData: T) => void;
  children: (loading: boolean) => React.ReactNode;
};
export const FormBody = ({ children, onResolve }: FormBodyProps) => {
  const { pop } = useModal();
  const [isPending, startTransition] = React.useTransition();
  const [errors, setErrors] = React.useState<Errors>();

  const nameRef = React.useRef<HTMLInputElement>(null);
  const emailRef = React.useRef<HTMLInputElement>(null);
  const experienceRef = React.useRef<HTMLSelectElement>(null);
  const githubRef = React.useRef<HTMLInputElement>(null);

  const validations: Validations = [
    [
      nameRef,
      (name) =>
        formValidator.notEmpty(name) &&
        formValidator.lengthInRange(name, 2, 20),
    ],
    [
      emailRef,
      (email) =>
        formValidator.emailRegex(email) &&
        formValidator.lengthInRange(email, 5, 50),
    ],
    [experienceRef, formValidator.notEmpty],
  ];

  const validator = (): boolean => {
    const validationErrors: Errors = {};
    const isFormValid = validations.every(([ref, validtor]) => {
      const hasPassed = validtor(ref.current?.value ?? "");
      if (hasPassed) return true;

      const invalidKey = ref.current?.name as RequiredKeys<ModalFormData>;
      validationErrors[invalidKey] = errorMessages[invalidKey];
      ref.current?.focus();
      return false;
    });

    if (Object.values(validationErrors).length > 0) setErrors(validationErrors);
    return isFormValid;
  };

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validator()) return;

    startTransition(async () => {
      const formData: ModalFormData = {
        name: nameRef.current?.value || "",
        email: emailRef.current?.value || "",
        experience: experienceRef.current?.value as Experience,
        github: githubRef.current?.value || "",
      };

      await sleep(() => onResolve<ModalFormData>(formData), 1500);
      pop();
    });
  };

  return (
    <FormLayout
      role="form"
      aria-label="신청서"
      onSubmit={onFormSubmit}
      noValidate>
      <WithLabel label="이름 / 닉네임">
        {(label) => (
          <>
            <Input
              ref={nameRef}
              id={label}
              type="text"
              name="name"
              min={2}
              maxLength={20}
              tabIndex={2}
              required
              aria-required="true"
              aria-label="이름 입력란"
              aria-invalid={errors?.name ? "false" : "true"}
              aria-describedby={"name-error"}
            />
            <SreenReader
              id="name-error"
              role="alert"
              aria-live="assertive"
              readCondition={Boolean(errors?.name)}>
              {errorMessages["name"]}
            </SreenReader>
          </>
        )}
      </WithLabel>
      <WithLabel label="이메일">
        {(label) => (
          <>
            <Input
              ref={emailRef}
              id={label}
              type="email"
              name="email"
              min={5}
              maxLength={50}
              tabIndex={3}
              required
              aria-required="true"
              aria-label="이메일 입력란"
              aria-invalid={errors?.email ? "false" : "true"}
              aria-describedby={"email-error"}
            />
            <SreenReader
              id="email-error"
              role="alert"
              aria-live="assertive"
              readCondition={Boolean(errors?.email)}>
              {errorMessages["email"]}
            </SreenReader>
          </>
        )}
      </WithLabel>
      <WithLabel label="FE 경력 연차">
        {(label) => (
          <>
            <Select
              ref={experienceRef}
              id={label}
              name="experience"
              tabIndex={4}
              required
              aria-label="FE 경력 연차 선택란"
              aria-describedby={"experience-error"}
              aria-invalid={errors?.experience ? "false" : "true"}
              aria-required="true">
              <option value="">{"선택하세요"}</option>
              <option value="junior">{"0-3년차"}</option>
              <option value="mid">{"4-7년차"}</option>
              <option value="senior">{"8년차 이상"}</option>
            </Select>
            <SreenReader
              id="experience-error"
              role="alert"
              aria-live="assertive"
              readCondition={Boolean(errors?.experience)}>
              {errorMessages["experience"]}
            </SreenReader>
          </>
        )}
      </WithLabel>
      <WithLabel label="GitHub 링크 (선택)">
        {(label) => (
          <Input
            ref={githubRef}
            id={label}
            type="url"
            name="github"
            tabIndex={5}
            aria-label="GitHub 링크 (선택)"
            aria-invalid="false"
            aria-describedby="github-hint"
          />
        )}
      </WithLabel>
      <SreenReader id="github-hint">
        {"GitHub 프로필 링크를 입력하세요"}
      </SreenReader>

      {children(isPending)}
    </FormLayout>
  );
};
