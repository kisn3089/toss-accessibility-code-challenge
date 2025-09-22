export interface ModalContext {
  getModals: ReturnModalElements;
  push: PromisifyElement;
  pop: ReturnModalElements;
  close: () => [];
}

interface WithResolver<ReturnData> {
  onResolve?: (returnData: ReturnData) => void;
}

/** Promise 객체를 반환 */
export type PromisifyElement = <ReturnData>(
  element: React.ReactElement
) => Promise<ReturnData>;

/** 매개변수 element를 복사하여 resolve 객체를 props에 추가하여 element를 반환 */
export type CloneElementWithResolver = <
  ReturnData,
  Element extends WithResolver<ReturnData>
>(
  element: React.ReactElement,
  resolve: (returnData: ReturnData) => void
) => React.ReactElement<Element>;

export type ReturnModalElements = () => React.ReactElement[];
