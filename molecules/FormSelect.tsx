import Stack from "../atoms/Stack";
import Label from "../atoms/Label";
import Option from "../atoms/Option";
import Select from "../atoms/Select";
import { useIntl } from "react-intl";

export default function FormSelect({
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
  list: { label: string; value: string }[];
}) {
  const id = "id" + Math.floor(Math.random() * 1000000);
  const intl = useIntl();
  return (
    <Stack style={{ marginBottom: "0.8rem" }}>
      <Label htmlFor={id}>{label}</Label>
      <Select id={id} value={value} onChange={onChange} disabled={disabled}>
        {list.map((item, idx) => (
          <Option
            value={item.value}
            label={intl.formatMessage({
              id: item.label,
              defaultMessage: item.label,
            })}
            key={idx}
          />
        ))}
      </Select>
    </Stack>
  );
}
