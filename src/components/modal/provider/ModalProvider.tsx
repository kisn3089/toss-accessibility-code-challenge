import { createContext, useState, useCallback } from "react";
import type { ModalContext } from "../../../types/modal/ModalContext.type";
import React from "react";

const ModalContext = createContext<ModalContext | null>(null);

export const useModal = (): ModalContext => {
  const modalCtx = React.useContext(ModalContext);
  if (!modalCtx) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return modalCtx;
};

export const ModalProvider = ({ children }: React.PropsWithChildren) => {
  const [modalElements, setModalElements] = useState<React.ReactNode[]>([]);

  const getModals = useCallback(
    (): React.ReactNode[] => modalElements,
    [modalElements]
  );

  const push = useCallback(
    (modalElement: React.ReactNode): React.ReactNode[] => {
      const pushedModals = [...modalElements, modalElement];
      setModalElements(pushedModals);
      return pushedModals;
    },
    [modalElements]
  );

  const pop = useCallback((): React.ReactNode[] => {
    const poppedModals = modalElements.slice(0, -1);
    setModalElements(poppedModals);
    return poppedModals;
  }, [modalElements]);

  const close = useCallback((): [] => {
    if (modalElements.length > 0) {
      setModalElements([]);
    }
    return [];
  }, []);

  const contextValue: ModalContext = {
    getModals,
    push,
    pop,
    close,
  };

  return (
    <ModalContext.Provider value={contextValue}>
      <>{children}</>
    </ModalContext.Provider>
  );
};
