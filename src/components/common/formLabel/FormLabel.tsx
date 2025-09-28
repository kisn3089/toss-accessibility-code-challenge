import { Column, Label } from "./FormLabel.style";

type FormLabelProps = {
  label: string;
  children: (label: string, ariaId?: string) => React.ReactNode;
};

export const FormLabel = ({ label, children }: FormLabelProps) => {
  return (
    <Column>
      <Label htmlFor={label}>{label}</Label>
      {children(label)}
    </Column>
  );
};
