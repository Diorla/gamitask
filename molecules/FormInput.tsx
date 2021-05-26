import Stack from "../atoms/Stack";
import Label from "../atoms/Label";
import Input from "../atoms/Input";

export default function FormInput({
  label,
  value,
  type = "text",
  placeholder,
  onChange,
  disabled,
}: {
  label: string;
  value: any;
  type?: string;
  placeholder: string;
  onChange?: (e: any) => void;
  disabled?: boolean;
}) {
  const id = "id" + Math.floor(Math.random() * 1000000);
  return (
    <Stack style={{ marginBottom: "0.8rem" }}>
      <Label htmlFor={id}>{label}</Label>
      <Input
        value={value}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
      />
    </Stack>
  );
}
