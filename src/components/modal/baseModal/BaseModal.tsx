import {
  FormAnnounce,
  FormHeader,
  FormSection,
  FormTitle,
} from "./BaseModal.style";

type BaseModalProps = {
  title: string;
  announce: string;
} & React.PropsWithChildren;
const BaseModal = ({ children, title, announce }: BaseModalProps) => {
  return (
    <FormSection
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-form-title"
      aria-describedby="modal-form-description">
      <FormHeader>
        <FormTitle id="modal-form-title" tabIndex={1}>
          {title}
        </FormTitle>
        <FormAnnounce id="modal-form-description">{announce}</FormAnnounce>
      </FormHeader>
      {children}
    </FormSection>
  );
};

export default BaseModal;
