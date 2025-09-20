import { useModal } from "../modal/provider/ModalProvider";

export const ModalFormPage = () => {
  const { push, pop, getModals, close } = useModal();
  return (
    <div>
      <div
        onClick={() =>
          push(
            <div>
              <h1>New Modal</h1>
              <button onClick={pop}></button>
            </div>
          )
        }>
        push
      </div>
      <div onClick={() => console.log(getModals())}>getModals</div>
      <div onClick={close}>close</div>
    </div>
  );
};
