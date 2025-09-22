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
          <FormFooter>
            <Button type="button" mode="secondary">
              {"취소"}
            </Button>
            <Button type="submit" mode="primary" disabled={!canSubmit}>
              {"제출하기"}
            </Button>
          </FormFooter>
        )}
      </FormBody>
    </BaseModal>
  );
};
