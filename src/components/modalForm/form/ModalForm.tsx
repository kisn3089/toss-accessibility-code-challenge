import React from "react";
import Button from "../../atom/button/Button";
import { ScreenReader } from "../../common/ScreenReader";
import BaseModal from "../../modal/baseModal/BaseModal";
import { useModal } from "../../modal/provider/ModalProvider";
import {
  SubscribeForm,
  type SubsribeFormData,
} from "../../subscribeForm/SubscribeForm";
import FormFooter from "../footer/FormFooter";
import { Gap } from "../footer/FormFooter.style";
import { FormBody } from "../formBody/FormBody";
import { CodeBlock } from "../../common/codeBlock/CodeBlock";

type ModalFormProps = {
  onResolve?: <T>(returnData: T) => void;
};

export const ModalForm = ({ onResolve }: ModalFormProps) => {
  if (!onResolve) return null;
  const [returnedFormData, setReturnedFormData] =
    React.useState<SubsribeFormData | null>(null);

  const { pop, push } = useModal();
  const onCloseModal = () => {
    onResolve(null);
    pop();
  };

  const openSubscribeModal = async () => {
    const pushedResult = await push<SubsribeFormData>(<SubscribeForm />);
    setReturnedFormData(pushedResult);
  };

  return (
    <BaseModal
      title="신청 폼"
      announce="이메일과 FE 경력 연차 등 간단한 정보를 입력해주세요.">
      <CodeBlock codeData={returnedFormData} />
      <FormBody onResolve={onResolve}>
        {(loading) => (
          <FormFooter aria-label="폼 액션 버튼">
            <Button
              type="button"
              mode="primary"
              aria-label="구독하기"
              aria-describedby="subscribe"
              onClick={openSubscribeModal}>
              {"구독하기"}
              <ScreenReader id="subscribe" role="status" aria-live="assertive">
                {"입력하신 이메일로 서비스 소식을 보내드려요."}
              </ScreenReader>
            </Button>
            <Gap>
              <Button
                type="button"
                mode="secondary"
                onClick={onCloseModal}
                aria-label="신청 취소하기"
                aria-describedby="cancel">
                {"취소"}
                <ScreenReader id="cancel" role="status" aria-live="assertive">
                  {"작성한 내용이 저장되지 않고 창이 닫힙니다."}
                </ScreenReader>
              </Button>
              <Button
                type="submit"
                mode="primary"
                disabled={loading}
                aria-labelledby="submitting"
                aria-describedby="submit-help">
                {loading ? "제출 중.." : "제출하기"}
                <ScreenReader
                  id="submit-help"
                  role="status"
                  aria-live="assertive">
                  {"신청서 제출하기 버튼, 신청서를 검토 후 서버로 전송합니다."}
                </ScreenReader>
                <ScreenReader
                  id="submitting"
                  role="status"
                  aria-live="assertive"
                  readCondition={loading}>
                  {"신청서 제출중..."}
                </ScreenReader>
              </Button>
            </Gap>
          </FormFooter>
        )}
      </FormBody>
    </BaseModal>
  );
};
