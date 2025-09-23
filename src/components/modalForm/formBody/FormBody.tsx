import React from "react";
import { FormLayout } from "./FormBody.style";
import { WithLabel } from "../withLabel/WithLabel";
import { Input, Select } from "../withLabel/WithLabel.style";
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
  type SubmitStatus,
  type Validations,
} from "./FormBody.type";

type FormBodyProps = {
  onResolve: <T>(returnData: T) => void;
  children: (
    loading: boolean,
    submitAttempted: SubmitStatus
  ) => React.ReactNode;
};
export const FormBody = ({ children, onResolve }: FormBodyProps) => {
  const { pop } = useModal();
  const [isPending, startTransition] = React.useTransition();
  const [errors, setErrors] = React.useState<Errors>();
  const [submitStatus, setSubmitStatus] = React.useState<SubmitStatus>("idle");

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
    const resultValidate = validations.every(([ref, validtor]) => {
      const isValid = validtor(ref.current?.value ?? "");
      if (!isValid && ref.current?.name) {
        const validateKey = ref.current?.name as RequiredKeys<ModalFormData>;
        validationErrors[validateKey] = errorMessages[validateKey];
        ref.current?.focus();
      }

      return isValid;
    });

    if (Object.values(validationErrors).length > 0) setErrors(validationErrors);
    return resultValidate;
  };

  const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validator()) return;

    startTransition(async () => {
      setSubmitStatus("submitting");

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
      onSubmit={formSubmit}
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
              aria-invalid={errors?.experience ? "false" : "true"}
              aria-describedby={"experience-error"}
              aria-label="FE 경력 연차 선택란"
              aria-required="true">
              <option value="">선택하세요</option>
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
        GitHub 프로필 링크를 입력하세요
      </SreenReader>

      <SreenReader
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        readCondition={submitStatus === "submitting"}>
        신청서 제출중...
      </SreenReader>

      <SreenReader
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        readCondition={!errors && submitStatus === "success"}>
        신청서 제출에 성공했습니다.
      </SreenReader>

      {children(isPending, submitStatus)}
    </FormLayout>
  );
};
