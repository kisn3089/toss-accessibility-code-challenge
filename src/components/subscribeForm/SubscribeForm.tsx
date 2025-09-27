import React from "react";
import { FormLabel } from "../common/formLabel/FormLabel";
import BaseModal from "../modal/baseModal/BaseModal";
import { FormLayout } from "../modalForm/formBody/FormBody.style";
import { EmailInput } from "../common/inputs/EmailInput";
import { type Validations } from "../modalForm/formBody/FormBody.type";
import { formValidator } from "../../utils/validation/validator";
import { useFormValidate } from "../../hooks/useFormValidate";
import { sleep } from "../../utils/sleep";
import { useModal } from "../modal/provider/ModalProvider";
import Button from "../atom/button/Button";
import { ScreenReader } from "../common/ScreenReader";
import { ButtonGap, MaxSize } from "./SubscribeForm.style";
import { FormNotice } from "../common/formNotice/FormNotice";
import subscribeNotice from "../../notice/subscribe";

const errorMessages = {
  email: "올바른 이메일 형식으로 입력해주세요.",
} as const;

export type SubsribeFormData = {
  email: string;
};

type SubscribeFormErrors = {
  onResolve?: <T>(returnData: T) => void;
};

export const SubscribeForm = ({ onResolve }: SubscribeFormErrors) => {
  if (!onResolve) return null;

  const [isPending, startTransition] = React.useTransition();
  const emailRef = React.useRef<HTMLInputElement>(null);
  const { pop } = useModal();

  const validation: Validations = [[emailRef, formValidator.emailValidator]];
  const { errors, validator, clearErrors } = useFormValidate(
    validation,
    errorMessages
  );

  const onCloseModal = () => {
    onResolve(null);
    pop();
  };

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearErrors();

    if (!validator()) return;

    startTransition(async () => {
      const formData: SubsribeFormData = {
        email: emailRef.current?.value ?? "",
      };

      await sleep(() => onResolve<SubsribeFormData>(formData), 1500);
      pop();
    });
  };

  return (
    <BaseModal
      title="구독하기"
      announce="입력하신 이메일로 서비스 소식을 보내드려요."
      maxHeight={320}>
      <FormLayout
        role="form"
        aria-label="구독하기"
        onSubmit={onFormSubmit}
        noValidate>
        <MaxSize>
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
          <FormNotice
            ariaLabelId="privacy-notice"
            heading={subscribeNotice.heading}
            content={subscribeNotice.content}
          />
          <ButtonGap>
            <Button
              type="button"
              mode="secondary"
              size="full"
              onClick={onCloseModal}
              aria-label="구독 취소하기"
              aria-describedby="cancel">
              {"취소"}
              <ScreenReader id="cancel" role="status" aria-live="assertive">
                {"작성한 내용이 저장되지 않고 창이 닫힙니다."}
              </ScreenReader>
            </Button>
            <Button
              type="submit"
              mode="primary"
              size="full"
              disabled={isPending}
              aria-labelledby="submitting"
              aria-describedby="submit-help">
              {isPending ? "구독중.." : "구독하기"}
              <ScreenReader
                id="submit-help"
                role="status"
                aria-live="assertive">
                {"구독하기 버튼, 서버로 전송합니다."}
              </ScreenReader>
              <ScreenReader
                id="submitting"
                role="status"
                aria-live="assertive"
                readCondition={isPending}>
                {"구독중..."}
              </ScreenReader>
            </Button>
          </ButtonGap>
        </MaxSize>
      </FormLayout>
    </BaseModal>
  );
};
