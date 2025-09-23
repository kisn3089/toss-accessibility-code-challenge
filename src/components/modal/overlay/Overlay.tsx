import { ModalFormLayout, OverlayLayout } from "./Overlay.style";
import { useModal } from "../provider/ModalProvider";
import React from "react";

export const Overlay = () => {
  const { getModals, close, pop } = useModal();
  const modalsLength = getModals().length;

  React.useEffect(() => {
    // ESC 시 모든 모달 닫힘
    const onKeyboardEvent = (e: KeyboardEvent) => {
      if (e.key === "Escape" && getModals().length > 0) return close();
    };

    document.addEventListener("keydown", onKeyboardEvent);
    return () => document.removeEventListener("keydown", onKeyboardEvent);
  }, [close, getModals]);

  if (modalsLength === 0) return null;

  const onOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) pop();
  };

  return (
    <>
      {getModals().map((ModalComponent, index) => {
        const indicateMe = modalsLength === index + 1;

        return (
          <OverlayLayout
            key={index}
            onClick={onOverlayClick}
            $isLastIndex={indicateMe}
            inert={!indicateMe}>
            <ModalFormLayout>{ModalComponent}</ModalFormLayout>
          </OverlayLayout>
        );
      })}
    </>
  );
};
