import { useModal } from "../../components/modal/provider/ModalProvider";
import { ModalForm } from "../../components/modalForm/form/ModalForm";
import { Center } from "./ModalFormPage.style";
import Button from "../../components/atom/button/Button";
import type { FormData } from "../../components/modalForm/formBody/FormBody";

export const ModalFormPage = () => {
  const { push } = useModal();

  const addModal = async () => {
    const pushedResult = await push<FormData>(<ModalForm />);
    console.log("pushedResult: ", pushedResult);
  };

  return (
    <Center>
      <Button tabIndex={1} onClick={addModal}>
        {"신청 폼 작성하기"}
      </Button>
    </Center>
  );
};
