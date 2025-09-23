import Button from "../../atom/button/Button";
import { SreenReader } from "../../common/ScreenReader";
import BaseModal from "../../modal/baseModal/BaseModal";
import { useModal } from "../../modal/provider/ModalProvider";
import FormFooter from "../footer/FormFooter";
import { FormBody } from "../formBody/FormBody";

type ModalFormProps = { onResolve?: <T>(returnData: T) => void };

export const ModalForm = ({ onResolve }: ModalFormProps) => {
  if (!onResolve) return null;

  const { pop } = useModal();
  const onCloseModal = () => {
    onResolve?.(null);
    pop();
  };

  return (
    <BaseModal
      title="신청 폼"
      announce="이메일과 FE 경력 연차 등 간단한 정보를 입력해주세요.">
      <FormBody onResolve={onResolve}>
        {(loading) => (
          <FormFooter aria-label="폼 액션 버튼">
            <Button
              type="button"
              mode="secondary"
              onClick={onCloseModal}
              tabIndex={6}
              role="button"
              aria-label="신청 취소하기"
              aria-describedby="cancel">
              {"취소"}
            </Button>
            <SreenReader id="cancel" role="status" aria-live="assertive">
              {"작성한 내용이 저장되지 않고 창이 닫힙니다."}
            </SreenReader>
            <Button
              type="submit"
              mode="primary"
              tabIndex={7}
              disabled={loading}
              aria-labelledby="submitting"
              aria-describedby="submit-help"
              role="button">
              {loading ? "제출 중.." : "제출하기"}
            </Button>
            <SreenReader id="submit-help" role="status" aria-live="assertive">
              {"신청서 제출하기 버튼, 신청서를 검토 후 서버로 전송합니다."}
            </SreenReader>
            <SreenReader
              id="submitting"
              role="status"
              aria-live="assertive"
              readCondition={loading}>
              {"신청서 제출중..."}
            </SreenReader>
          </FormFooter>
        )}
      </FormBody>
    </BaseModal>
  );
};
