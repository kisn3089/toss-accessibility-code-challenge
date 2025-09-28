import { Column, Label, Required } from "./FormLabel.style";

type FormLabelProps = {
  label: string;
  id: string;
  required?: boolean;
  children: (id: string) => React.ReactNode;
};

export const FormLabel = ({
  id,
  label,
  required,
  children,
}: FormLabelProps) => {
  return (
    <Column>
      <Label htmlFor={id}>
        {label}
        {required && <Required aria-hidden="true">{"*"}</Required>}
      </Label>
      {children(id)}
    </Column>
  );
};
