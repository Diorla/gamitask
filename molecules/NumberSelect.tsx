import React from "react";
import Label from "../atoms/Label";
import Line from "../atoms/Line";

export interface NumberSelectProps {
  range: [number, number];
  onChange: (e: any) => void;
  value: number;
  label: string;
  isLeft?: boolean;
}

export default function NumberSelect({
  range,
  onChange,
  value,
  label,
  isLeft = false,
}: NumberSelectProps): JSX.Element {
  const difference = range[1] - range[0];
  const start = range[0];
  const sixty = new Array(difference + 1);
  sixty.fill(1);
  const id = "id" + Math.floor(Math.random() * 1000000);
  return (
    <Line style={{ alignItems: "center" }}>
      {isLeft && (
        <Label htmlFor={id} style={{ marginRight: "0.4rem" }}>
          {label}
        </Label>
      )}
      <select onChange={onChange} value={value} id={id}>
        {sixty.map((_item, idx) => (
          <option value={idx + start} key={idx}>
            {("0" + (idx + start)).slice(-2)}
          </option>
        ))}
      </select>
      {!isLeft && <Label htmlFor={id}>{label}</Label>}
    </Line>
  );
}
