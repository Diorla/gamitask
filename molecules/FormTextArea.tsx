import Stack from "../atoms/Stack";
import Label from "../atoms/Label";
import Input from "../atoms/Input";
import React from "react";
import TextArea from "../atoms/TextArea";

export default function FormTextArea({
  label,
  value,
  placeholder,
  onChange,
  disabled,
  rows,
}: {
  label: string;
  value: any;
  type?: string;
  placeholder: string;
  onChange?: (e: any) => void;
  disabled?: boolean;
  rows: number;
}) {
  const id = "id" + Math.floor(Math.random() * 1000000);
  return (
    <Stack style={{ marginBottom: "0.8rem" }}>
      <Label htmlFor={id}>{label}</Label>
      <TextArea
        id={id}
        rows={rows}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
      />
    </Stack>
  );
}
