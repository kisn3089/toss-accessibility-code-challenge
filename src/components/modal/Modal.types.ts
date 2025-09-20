export interface FormField {
  id: string;
  label: string;
  type: "text" | "email" | "textarea";
  required?: boolean;
  placeholder?: string;
  rows?: number;
  validation?: (value: string) => string | null;
}

export interface ModalTheme {
  colors?: {
    primary?: string;
    secondary?: string;
    error?: string;
    background?: string;
    text?: string;
    overlay?: string;
  };
  spacing?: {
    padding?: string;
    margin?: string;
  };
  borderRadius?: string;
  animation?: {
    duration?: string;
    easing?: string;
  };
}

export interface ModalProps<T = Record<string, any>> {
  isOpen: boolean;
  onClose: (result: T | null) => void;
  triggerRef?: React.RefObject<HTMLElement>;
  title?: string;
  description?: string;
  fields?: FormField[];
  initialData?: Partial<T>;
  submitText?: string;
  cancelText?: string;
  theme?: ModalTheme;
  className?: string;
  maxWidth?: string;
  children?: React.ReactNode;
  onSubmit?: (data: T) => Promise<void> | void;
  validation?: (data: Partial<T>) => Record<string, string>;
}

export interface ModalContextType {
  openModal: <T = Record<string, any>>() => Promise<T | null>;
  closeModal: () => void;
  isOpen: boolean;
}
