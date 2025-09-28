import { Content, SubscribeHeading3 } from "./FormNotice.style";

type FormNoticeProps = {
  ariaLabelId: string;
  heading?: string;
  content: string;
};
export const FormNotice = ({
  ariaLabelId,
  heading,
  content,
}: FormNoticeProps) => {
  return (
    <section aria-labelledby={ariaLabelId}>
      {heading && (
        <SubscribeHeading3 id={ariaLabelId}>{heading}</SubscribeHeading3>
      )}
      <Content>{content}</Content>
    </section>
  );
};
