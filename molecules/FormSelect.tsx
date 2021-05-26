import Stack from "../atoms/Stack";
import Label from "../atoms/Label";
import Option from "../atoms/Option";
import Select from "../atoms/Select";

export default function FormInput({
  label,
  value,
  onChange,
  disabled,
  list,
}: {
  label: string;
  value: any;
  type?: string;
  onChange?: (e: any) => void;
  disabled?: boolean;
  list: string[];
}) {
  const id = "id" + Math.floor(Math.random() * 1000000);
  return (
    <Stack style={{ marginBottom: "0.8rem" }}>
      <Label htmlFor={id}>{label}</Label>
      <Select id={id} value={value} onChange={onChange} disabled={disabled}>
        {list.map((item, idx) => (
          <Option value={item} label={item} key={idx} />
        ))}
      </Select>
    </Stack>
  );
}
