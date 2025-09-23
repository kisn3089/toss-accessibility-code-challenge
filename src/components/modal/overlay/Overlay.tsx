import { ModalFormLayout, OverlayLayout } from "./Overlay.style";
import { useModal } from "../provider/ModalProvider";
import React from "react";

export const Overlay = () => {
  const { getModals, close } = useModal();

  // 모달 open 시 직전 포커싱된 element를 캡쳐, unmount 시 캡쳐한 element에 focus. (최초 1회 실행)
  React.useEffect(() => {
    const previousActiveElement = document.activeElement;
    return () => (previousActiveElement as HTMLElement).focus();
  }, []);

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
      <ModalFormLayout className="overlay">
        {getModals().map((ModalComponent, index) => (
          <div key={index}>{ModalComponent}</div>
        ))}
      </ModalFormLayout>
    </OverlayLayout>
  );
};
