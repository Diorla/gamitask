import React from "react";
import Label from "../atoms/Label";
import RadioInput from "../atoms/Radio";

export default function Radio({
  label,
  isLeft = false,
  onChange,
  checked,
}: {
  label: string;
  isLeft?: boolean;
  onChange: (e: any) => void;
  checked: boolean;
}): JSX.Element {
  const id = "id" + Math.floor(Math.random() * 10000000);
  return (
    <>
      {isLeft && (
        <Label
          htmlFor={id}
          style={{ marginLeft: "0.4rem", marginRight: "0.1rem" }}
        >
          {label}
        </Label>
      )}
      <RadioInput id={id} type="radio" checked={checked} onChange={onChange} />
      {!isLeft && (
        <Label
          htmlFor={id}
          style={{ marginRight: "0.4rem", marginLeft: "0.1rem" }}
        >
          {label}
        </Label>
      )}
    </>
  );
}
