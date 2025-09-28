import React from "react";
import { FormLabel } from "../common/formLabel/FormLabel";
import BaseModal from "../modal/baseModal/BaseModal";
import { FormLayout } from "../modalForm/formBody/FormBody.style";
import { EmailInput } from "../common/inputs/emailInput";
import { type Validations } from "../modalForm/formBody/FormBody.type";
import { formValidator } from "../../utils/validation/validator";
import { useFormValidate } from "../../hooks/useFormValidate";
import { sleep } from "../../utils/sleep";
import { useModal } from "../modal/provider/ModalProvider";
import Button from "../atom/button/Button";
import { SreenReader } from "../common/ScreenReader";
import { ButtonGap, Caption, MaxSize } from "./SubscribeForm.style";

const errorMessages = {
  email: "올바른 이메일 형식으로 입력해주세요.",
} as const;

export type SubsribeFormData = {
  email: string;
  donation?: number;
};

type SubscribeFormErrors = {
  onResolve?: <T>(returnData: T) => void;
};

export const SubscribeForm = ({ onResolve }: SubscribeFormErrors) => {
  if (!onResolve) return null;

  const [isPending, startTransition] = React.useTransition();
  const emailRef = React.useRef<HTMLInputElement>(null);
  const donationRef = React.useRef<HTMLInputElement>(null);
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
        donation: Number(donationRef.current?.value) ?? undefined,
      };

      await sleep(() => onResolve<SubsribeFormData>(formData), 1500);
      pop();
    });
  };

  return (
    <BaseModal
      title="구독하기"
      announce="입력하신 이메일로 서비스 소식을 보내드려요."
      maxHeight={420}>
      <FormLayout
        role="form"
        aria-label="구독하기"
        onSubmit={onFormSubmit}
        noValidate>
        <MaxSize>
          <FormLabel label="이메일">
            {(label) => (
              <EmailInput
                ref={emailRef}
                id={label}
                errorMessage={errors?.email && errorMessages.email}
                tabIndex={2}
                aria-label="이메일을 입력해주세요."
                aria-describedby={"email-valid"}
              />
            )}
          </FormLabel>
          <FormLabel label="기부">
            {(label) => (
              <EmailInput
                ref={donationRef}
                id={label}
                tabIndex={3}
                aria-label="기부할 금액을 입력해주세요."
              />
            )}
          </FormLabel>
          <SubscribeCaption />
          <ButtonGap>
            <Button
              type="button"
              mode="secondary"
              size="full"
              onClick={onCloseModal}
              tabIndex={7}
              role="button"
              aria-label="구독 취소하기"
              aria-describedby="cancel">
              {"취소"}
              <SreenReader id="cancel" role="status" aria-live="assertive">
                {"작성한 내용이 저장되지 않고 창이 닫힙니다."}
              </SreenReader>
            </Button>
            <Button
              type="submit"
              mode="primary"
              size="full"
              tabIndex={8}
              disabled={isPending}
              aria-labelledby="submitting"
              aria-describedby="submit-help"
              role="button">
              {isPending ? "구독중.." : "구독하기"}
              <SreenReader id="submit-help" role="status" aria-live="assertive">
                {"구독하기 버튼, 서버로 전송합니다."}
              </SreenReader>
              <SreenReader
                id="submitting"
                role="status"
                aria-live="assertive"
                readCondition={isPending}>
                {"구독중..."}
              </SreenReader>
            </Button>
          </ButtonGap>
        </MaxSize>
      </FormLayout>
    </BaseModal>
  );
};

const SubscribeCaption = () => {
  return (
    <Caption>
      {`[개인정보 처리 및 이용 안내]
저희는 구독 신청을 위해 입력하신 이메일 주소를 소중히 관리합니다. 수집된 이메일 정보는 뉴스레터 발송, 기부 관련 안내, 캠페인 소식 전달 이외의 목적으로는 절대 사용되지 않으며, 법령에 따른 보관 기간 이후 안전하게 파기됩니다.
또한, 이용자의 명시적 동의 없이 제3자에게 제공되지 않으며, 개인정보 보호법 및 관련 규정을 철저히 준수합니다. 이메일 정보의 이용 목적은 투명하게 공개되며, 언제든 구독 해지를 요청하실 수 있습니다. 구독 해지 시 모든 개인정보는 즉시 삭제 처리됩니다.`}
    </Caption>
  );
};
