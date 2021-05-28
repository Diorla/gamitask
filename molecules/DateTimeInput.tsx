import Line from "../atoms/Line";
import Label from "../atoms/Label";
import Input from "../atoms/Input";

export default function FormInput({
  label,
  value,
  type = "time",
  placeholder,
  onChange,
  disabled,
}: {
  label: string;
  value: any;
  type?: "time" | "date" | "datetime-local";
  placeholder: string;
  onChange?: (e: any) => void;
  disabled?: boolean;
}): JSX.Element {
  const id = "id" + Math.floor(Math.random() * 1000000);
  return (
    <Line style={{ marginBottom: "0.8rem", alignItems: "center" }}>
      <Label htmlFor={id} style={{ marginRight: ".4rem" }}>
        {label}
      </Label>
      <Input
        value={value}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
      />
    </Line>
  );
}
