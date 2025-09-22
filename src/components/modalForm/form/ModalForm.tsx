import Button from "../../atom/button/Button";
import BaseModal from "../../modal/baseModal/BaseModal";
import FormFooter from "../footer/FormFooter";
import { FormBody } from "../formBody/FormBody";

export const ModalForm = () => {
  return (
    <BaseModal
      title="신청 폼"
      announce="이메일과 FE 경력 연차 등 간단한 정보를 입력해주세요.">
      <FormBody>
        {(canSubmit) => (
          <FormFooter aria-label="폼 액션 버튼">
            <Button
              type="button"
              mode="secondary"
              tabIndex={6}
              role="button"
              aria-label="신청 취소하기">
              {"취소"}
            </Button>
            <Button
              type="submit"
              mode="primary"
              disabled={!canSubmit}
              tabIndex={7}
              aria-label={
                canSubmit
                  ? "신청서 제출하기"
                  : "필수 항목을 모두 입력한 후 제출 가능"
              }
              aria-describedby={!canSubmit ? "submit-help" : undefined}
              role="button">
              {"제출하기"}
            </Button>
            {!canSubmit && (
              <div
                id="submit-help"
                role="status"
                aria-live="polite"
                style={{ display: "none" }}>
                모든 필수 항목을 입력해주세요
              </div>
            )}
          </FormFooter>
        )}
      </FormBody>
    </BaseModal>
  );
};
