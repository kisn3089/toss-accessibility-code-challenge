import { useModal } from "../../components/modal/provider/ModalProvider";
import { ModalForm } from "../../components/modalForm/form/ModalForm";
import { Center } from "./ModalFormPage.style";
import Button from "../../components/atom/button/Button";
import type { ModalFormData } from "../../components/modalForm/formBody/FormBody.type";
import React from "react";
import { Code } from "../../components/common/code/Code";

export const ModalFormPage = () => {
  const [returnedFormData, setReturnedFormData] =
    React.useState<ModalFormData | null>(null);

  const { push, getModals } = useModal();

  const addModal = async () => {
    const pushedResult = await push<ModalFormData>(<ModalForm />);
    setReturnedFormData(pushedResult);
  };

  const isOpenedModal = getModals().length !== 0;

  return (
    <Center inert={isOpenedModal}>
      <Code codeData={returnedFormData} />
      <Button tabIndex={1} onClick={addModal}>
        {"🚀 신청 폼 작성하기"}
      </Button>
    </Center>
  );
};
