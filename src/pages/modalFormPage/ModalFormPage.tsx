import { useModal } from "../../components/modal/provider/ModalProvider";
import { ModalForm } from "../../components/modalForm/form/ModalForm";
import { Center, Mauual } from "./ModalFormPage.style";
import Button from "../../components/atom/button/Button";
import type { ModalFormData } from "../../components/modalForm/formBody/FormBody.type";
import React from "react";
import { CodeBlock } from "../../components/common/codeBlock/CodeBlock";

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
      <CodeBlock codeData={returnedFormData} />
      <Button onClick={addModal}>{"🚀 신청 폼 작성하기"}</Button>
      <Mauual>{"스크린리더 활성화 후 키보드로만 폼을 제출해보세요!"}</Mauual>
    </Center>
  );
};
