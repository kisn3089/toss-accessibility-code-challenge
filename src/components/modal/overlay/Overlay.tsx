import { ModalFormLayout, OverlayLayout } from "./Overlay.style";
import { useModal } from "../provider/ModalProvider";
import React from "react";

export const Overlay = () => {
  const { getModals, close, pop } = useModal();

  React.useEffect(() => {
    // ESC 시 모든 모달 닫힘
    const onKeyboardEvent = (e: KeyboardEvent) => {
      if (e.key === "Escape" && getModals().length > 0) return close();
    };

    document.addEventListener("keydown", onKeyboardEvent);
    return () => {
      document.removeEventListener("keydown", onKeyboardEvent);
    };
  }, [close, getModals]);

  if (getModals().length === 0) return null;

  const onOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) pop();
  };

  const modalsLength = getModals().length;

  return (
    <>
      {getModals().map((ModalComponent, index) => (
        <OverlayLayout
          key={index}
          onClick={onOverlayClick}
          $isLastIndex={modalsLength === index + 1}>
          <ModalFormLayout>{ModalComponent}</ModalFormLayout>
        </OverlayLayout>
      ))}
    </>
  );
};
