import { time } from "node:console";
import React from "react";
import Label from "../atoms/Label";

export default function NumberSelect({
  range,
  onChange,
  value,
  label,
}: {
  range: [number, number];
  onChange: (e: any) => void;
  value: number;
  label: string;
}) {
  const difference = range[1] - range[0];
  const start = range[0];
  const sixty = new Array(difference + 1);
  sixty.fill(1);
  const id = "id" + Math.floor(Math.random() * 1000000);
  return (
    <>
      <select onChange={onChange} value={value} id={id}>
        {sixty.map((_item, idx) => (
          <option value={idx + start}>{("0" + (idx + start)).slice(-2)}</option>
        ))}
      </select>
      <Label htmlFor={id}>{label}</Label>
    </>
  );
}
