import { ModalFormLayout, OverlayLayout } from "./Overlay.style";
import { useModal } from "../provider/ModalProvider";
import React from "react";

export const Overlay = () => {
  const { getModals, close } = useModal();

  React.useEffect(() => {
    // ESC 눌렀을 때 close() 하도록 구현.
    const onKeyboardEvent = (e: KeyboardEvent) => {
      if (e.key === "Escape" && getModals().length > 0) {
        close();
      }
    };

    document.addEventListener("keydown", onKeyboardEvent);
    return () => {
      document.removeEventListener("keydown", onKeyboardEvent);
    };
  }, [close, getModals]);

  if (getModals().length === 0) {
    return null;
  }

  const onOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      close();
    }
  };

  return (
    <OverlayLayout onClick={onOverlayClick}>
      <ModalFormLayout>
        {getModals().map((ModalComponent, index) => (
          <div key={index}>{ModalComponent}</div>
        ))}
      </ModalFormLayout>
    </OverlayLayout>
  );
};
