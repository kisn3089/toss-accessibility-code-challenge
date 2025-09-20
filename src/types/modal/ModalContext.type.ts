export interface ModalContext {
  getModals(): React.ReactNode[];
  push(modal: React.ReactNode): React.ReactNode[];
  pop(): React.ReactNode[];
  close(): React.ReactNode[];
}
