import { createContext, useState, useCallback } from "react";
import type {
  CloneElementWithResolver,
  ModalContext,
  PromisifyElement,
  ReturnModalElements,
} from "./ModalProvider.type";
import React from "react";

const ModalContexts = createContext<ModalContext | null>(null);

export const useModal = (): ModalContext => {
  const context = React.useContext(ModalContexts);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

export const ModalProvider = ({ children }: React.PropsWithChildren) => {
  const [modalElements, setModalElements] = useState<React.ReactElement[]>([]);

  const getModals: ReturnModalElements = useCallback(
    (): React.ReactElement[] => modalElements,
    [modalElements]
  );

  const push: PromisifyElement = useCallback(
    <ReturnData,>(element: React.ReactElement): Promise<ReturnData> => {
      return new Promise<ReturnData>((resolve) => {
        const clonedWithResolver = cloneElementWithResolver(element, resolve);
        const pushedModals = [...modalElements, clonedWithResolver];
        setModalElements(pushedModals);
      });
    },
    [modalElements]
  );

  const cloneElementWithResolver: CloneElementWithResolver = <
    ReturnData,
    Element
  >(
    element: React.ReactElement,
    resolve: (returnData: ReturnData) => void
  ): React.ReactElement<Element> => {
    if (!React.isValidElement<Element>(element)) {
      throw new Error("element is not ReactElement!");
    }

    return React.cloneElement(element, {
      ...element.props,
      onResolve: resolve,
    });
  };

  const pop: ReturnModalElements = useCallback((): React.ReactElement[] => {
    const poppedModals = modalElements.slice(0, -1);
    setModalElements(poppedModals);
    return poppedModals;
  }, [modalElements]);

  const close = useCallback((): [] => {
    if (modalElements.length > 0) setModalElements([]);

    return [];
  }, [modalElements]);

  const contextValue: ModalContext = {
    getModals,
    push,
    pop,
    close,
  };

  return (
    <ModalContexts.Provider value={contextValue}>
      <>{children}</>
    </ModalContexts.Provider>
  );
};
