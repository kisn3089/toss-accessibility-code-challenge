import Button from "../../atom/button/Button";
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
        {(loading, submitAttempted) => (
          <FormFooter aria-label="폼 액션 버튼">
            <Button
              type="button"
              mode="secondary"
              onClick={onCloseModal}
              tabIndex={6}
              role="button"
              aria-label="신청 취소하기">
              {"취소"}
            </Button>
            <Button
              type="submit"
              mode="primary"
              tabIndex={7}
              disabled={loading}
              //   aria-label={
              //     canSubmit
              //       ? "신청서 제출하기"
              //       : submitAttempted
              //       ? "폼 검증 실패: 필수 항목을 확인한 후 다시 제출하세요"
              //       : "필수 항목을 모두 입력한 후 제출 가능"
              //   }
              //   aria-describedby={!canSubmit ? "submit-help" : undefined}
              role="button">
              {loading ? "제출 중.." : "제출하기"}
            </Button>
            {/* {!canSubmit && (
              <div
                id="submit-help"
                role="status"
                aria-live="polite"
                style={{ display: "none" }}>
                모든 필수 항목을 입력해주세요
              </div>
            )} */}
          </FormFooter>
        )}
      </FormBody>
    </BaseModal>
  );
};
