import React from "react";
import { useModal } from "../components/modal/provider/ModalProvider";
import { ModalForm } from "../components/modalForm/form/ModalForm";

export const ModalFormPage = () => {
  const { push, pop, getModals, close } = useModal();
  React.useEffect(() => {
    push(<ModalForm></ModalForm>);
  }, []);

  return (
    <div>
      <div onClick={() => push(<ModalForm></ModalForm>)}>push</div>
      <div onClick={() => console.log(getModals())}>getModals</div>
      <div onClick={close}>close</div>
    </div>
  );
};
