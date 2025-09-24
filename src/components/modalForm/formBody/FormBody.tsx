import React from "react";
import { FormLayout } from "./FormBody.style";
import { formValidator } from "../../../utils/validation/validator";
import { FormLabel } from "../../common/formLabel/FormLabel";
import { useModal } from "../../modal/provider/ModalProvider";
import { sleep } from "../../../utils/sleep";
import {
  type Experience,
  type ModalFormData,
  type Validations,
} from "./FormBody.type";
import { NameInput } from "../../common/inputs/NameInput";
import { EmailInput } from "../../common/inputs/emailInput";
import { SelectInput } from "../../common/inputs/SelectInput";
import { UrlInput } from "../../common/inputs/urlInput";
import { useFormValidate } from "../../../hooks/useFormValidate";

const errorMessages = {
  name: "2자 이상, 20자 이하로 입력해주세요.",
  email: "올바른 이메일 형식으로 입력해주세요.",
  experience: "경력 연차를 선택해주세요.",
} as const;

type FormBodyProps = {
  onResolve: <T>(returnData: T) => void;
  children: (loading: boolean) => React.ReactNode;
};

export const FormBody = ({ children, onResolve }: FormBodyProps) => {
  const { pop } = useModal();
  const [isPending, startTransition] = React.useTransition();

  const nameRef = React.useRef<HTMLInputElement>(null);
  const emailRef = React.useRef<HTMLInputElement>(null);
  const experienceRef = React.useRef<HTMLSelectElement>(null);
  const githubRef = React.useRef<HTMLInputElement>(null);

  const validations: Validations = [
    [nameRef, formValidator.nameValidator],
    [emailRef, formValidator.emailValidator],
    [experienceRef, formValidator.notEmpty],
  ];

  const { errors, validator, clearErrors } = useFormValidate(
    validations,
    errorMessages
  );

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearErrors();

    if (!validator()) return;

    startTransition(async () => {
      const formData: ModalFormData = {
        name: nameRef.current?.value ?? "",
        email: emailRef.current?.value ?? "",
        experience: experienceRef.current?.value as Experience,
        github: githubRef.current?.value ?? "",
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
      <FormLabel label="이름 / 닉네임">
        {(label) => (
          <NameInput
            ref={nameRef}
            id={label}
            errorMessage={errors?.name && errorMessages.name}
            tabIndex={2}
            aria-label="이름 / 닉네임을 입력해주세요."
            aria-describedby={"name-valid"}
          />
        )}
      </FormLabel>
      <FormLabel label="이메일">
        {(label) => (
          <EmailInput
            ref={emailRef}
            id={label}
            errorMessage={errors?.email && errorMessages.email}
            tabIndex={3}
            aria-label="이메일을 입력해주세요."
            aria-describedby={"email-valid"}
          />
        )}
      </FormLabel>
      <FormLabel label="FE 경력 연차">
        {(label) => (
          <SelectInput
            ref={experienceRef}
            name="experience"
            id={label}
            tabIndex={4}
            errorMessage={errors?.experience && errorMessages.experience}
            aria-describedby={"experience-valid"}
          />
        )}
      </FormLabel>
      <FormLabel label="GitHub 링크 (선택)">
        {(label) => (
          <UrlInput
            ref={githubRef}
            id={label}
            name="github"
            tabIndex={5}
            aria-label="URL 링크를 입력해주세요."
            aria-describedby={"url-valid"}
          />
        )}
      </FormLabel>
      {children(isPending)}
    </FormLayout>
  );
};
