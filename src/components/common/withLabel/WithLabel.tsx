import { Column, Label } from "./WithLabel.style";

type LabelInputProps = {
  label: string;
  children: (label: string) => React.ReactNode;
};

export const WithLabel = ({ label, children }: LabelInputProps) => {
  return (
    <Column>
      <Label htmlFor={label}>{label}</Label>
      {children(label)}
    </Column>
  );
};
