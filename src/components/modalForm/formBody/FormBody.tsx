import React from "react";
import { FormLayout } from "./FormBody.style";
import { WithLabel } from "../withLabel/WithLabel";
import { Input, Select } from "../withLabel/WithLabel.style";
import { validtor } from "../../../utils/validation/validator";
import { SreenReader } from "../../common/ScreenReader";
import { useModal } from "../../modal/provider/ModalProvider";
import { sleep } from "../../../utils/sleep";

type Experience = "junior" | "mid" | "senior";
type Validations = [
  React.RefObject<HTMLInputElement | HTMLSelectElement | null>,
  (value: string) => boolean
][];

export interface FormData {
  name: string;
  email: string;
  experience: Experience;
  github: string;
}

type FormBodyProps = {
  onResolve: <T>(returnData: T) => void;
  children: (loading: boolean, submitAttempted: boolean) => React.ReactNode;
};
export const FormBody = ({ children, onResolve }: FormBodyProps) => {
  const { pop } = useModal();
  const [isPending, startTransition] = React.useTransition();
  const [submitAttempted, setSubmitAttempted] = React.useState(false);

  const nameRef = React.useRef<HTMLInputElement>(null);
  const emailRef = React.useRef<HTMLInputElement>(null);
  const experienceRef = React.useRef<HTMLSelectElement>(null);
  const githubRef = React.useRef<HTMLInputElement>(null);

  const validations: Validations = [
    [nameRef, validtor.isNotEmpty],
    [emailRef, validtor.isEmailForm],
    [experienceRef, validtor.isNotEmpty],
  ];

  const validator = (): boolean =>
    validations.every(([ref, validtor]) => {
      const isValid = validtor(ref.current?.value ?? "");
      if (!isValid) ref.current?.focus();

      return isValid;
    });

  const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(async () => {
      setSubmitAttempted(true);

      const formData: FormData = {
        name: nameRef.current?.value || "",
        email: emailRef.current?.value || "",
        experience: experienceRef.current?.value as Experience,
        github: githubRef.current?.value || "",
      };

      if (validator()) {
        await sleep(() => onResolve<FormData>(formData), 1500);
        pop();
      }
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
              //   aria-invalid={validation.name ? "false" : "true"}
              //   aria-describedby={validation.name ? undefined : "name-error"}
            />
            {/* {!validation.name && submitAttempted && (
              <SreenReader id="name-error" role="alert" aria-live="assertive">
                이름을 입력해주세요
              </SreenReader>
            )} */}
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
              //   aria-invalid={validation.email ? "false" : "true"}
              //   aria-describedby={validation.email ? undefined : "email-error"}
            />
            {/* {!validation.email && submitAttempted && (
              <SreenReader id="email-error" role="alert" aria-live="assertive">
                이메일 형식으로 입력해주세요
              </SreenReader>
            )} */}
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
              //   aria-invalid={validation.experience ? "false" : "true"}
              //   aria-describedby={
              //     validation.experience ? undefined : "experience-error"
              //   }
              aria-label="FE 경력 연차"
              aria-required="true">
              <option value="">선택하세요</option>
              <option value="junior">{"0-3년차"}</option>
              <option value="mid">{"4-7년차"}</option>
              <option value="senior">{"8년차 이상"}</option>
            </Select>
            {/* {!validation.experience && submitAttempted && (
              <SreenReader
                id="experience-error"
                role="alert"
                aria-live="assertive">
                경력 연차를 선택해주세요
              </SreenReader>
            )} */}
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

      {/* 제출 시 유효성 검증 실패 전체 피드백 */}
      {/* {submitAttempted && !canSubmit && (
        <SreenReader role="alert" aria-live="assertive" aria-atomic="true">
          폼 제출에 실패했습니다.{" "}
          {Object.entries(validation).filter(([, isValid]) => !isValid).length}
          개의 필수 항목을 확인해주세요.
        </SreenReader>
      )} */}

      {children(isPending, submitAttempted)}
    </FormLayout>
  );
};
