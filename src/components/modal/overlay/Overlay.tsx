import { ModalFormLayout, OverlayLayout } from "./Overlay.style";
import { useModal } from "../provider/ModalProvider";

export const Overlay = () => {
  const { getModals, close } = useModal();

  if (getModals().length === 0) {
    return null;
  }

  const onOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      close();
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape" && getModals().length) {
      close();
    }
  };

  return (
    <OverlayLayout onClick={onOverlayClick} onKeyDown={onKeyDown}>
      <ModalFormLayout>
        {getModals().map((ModalComponent, index) => (
          <div key={index}>{ModalComponent}</div>
        ))}
      </ModalFormLayout>
    </OverlayLayout>
  );
};
