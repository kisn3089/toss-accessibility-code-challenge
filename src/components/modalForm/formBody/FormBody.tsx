import React from "react";
import { FormLayout, Fieldset } from "./FormBody.style";
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
import { EmailInput } from "../../common/inputs/EmailInput";
import { SelectInput } from "../../common/inputs/SelectInput";
import { UrlInput } from "../../common/inputs/UrlInput";
import { useFormValidate } from "../../../hooks/useFormValidate";
import { FormNotice } from "../../common/formNotice/FormNotice";
import Hidden from "../../common/hidden/Hidden";

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
      onSubmit={onFormSubmit}
      noValidate
      aria-labelledby="modal-form-title">
      <Fieldset>
        <Hidden>
          <legend>{"신청서 작성 폼"}</legend>
        </Hidden>
        <FormLabel label="이름 / 닉네임" id="name-input" required>
          {(id) => (
            <NameInput
              ref={nameRef}
              id={id}
              name="name"
              errorMessage={errors?.name && errorMessages.name}
              aria-describedby={"name-valid"}
            />
          )}
        </FormLabel>
        <FormLabel label="이메일" id="email-input" required>
          {(id) => (
            <EmailInput
              ref={emailRef}
              id={id}
              name="email"
              errorMessage={errors?.email && errorMessages.email}
              aria-describedby={"email-valid"}
            />
          )}
        </FormLabel>
        <FormLabel label="FE 경력 연차" id="experience-input" required>
          {(id) => (
            <SelectInput
              ref={experienceRef}
              id={id}
              name="experience"
              errorMessage={errors?.experience && errorMessages.experience}
              aria-describedby={"experience-valid"}
            />
          )}
        </FormLabel>
        <FormLabel label="GitHub 링크" id="github-input">
          {(id) => (
            <UrlInput
              ref={githubRef}
              id={id}
              name="github"
              aria-describedby={"url-valid"}
            />
          )}
        </FormLabel>
        {children(isPending)}
      </Fieldset>
      <FormNotice
        ariaLabelId="form-notice"
        content={"* 표시된 항목은 필수 입력입니다."}
      />
    </FormLayout>
  );
};
