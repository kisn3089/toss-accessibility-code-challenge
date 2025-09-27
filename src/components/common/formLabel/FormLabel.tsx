import { Column, Label, Optional, RowGap } from "./FormLabel.style";

type FormLabelProps = {
  label: string;
  optional?: boolean;
  children: (label: string, ariaId?: string) => React.ReactNode;
};

export const FormLabel = ({ label, optional, children }: FormLabelProps) => {
  return (
    <Column>
      <RowGap>
        <Label htmlFor={label}>{label}</Label>
        <Optional>{optional && "(선택)"}</Optional>
      </RowGap>
      {children(label)}
    </Column>
  );
};
