import React from "react";
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
  const titleRef = React.useRef<HTMLHeadingElement>(null);

  // 모달 open 시 직전 포커싱된 element를 캡쳐, unmount 시 캡쳐한 element에 focus. (최초 1회 실행)
  React.useEffect(() => {
    const previousActiveElement = document.activeElement;
    return () => (previousActiveElement as HTMLElement).focus();
  }, []);

  // open 시 title focus
  React.useEffect(() => titleRef.current?.focus(), []);

  return (
    <FormSection
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-form-title"
      aria-describedby="modal-form-description">
      <FormHeader>
        <FormTitle ref={titleRef} id="modal-form-title" tabIndex={1}>
          {title}
        </FormTitle>
        <FormAnnounce id="modal-form-description">{announce}</FormAnnounce>
      </FormHeader>
      {children}
    </FormSection>
  );
};

export default BaseModal;
