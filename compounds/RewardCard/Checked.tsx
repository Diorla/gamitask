import React from "react";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import Line from "../../atoms/Line";
import StrikeThrough from "./StrikeThrough";

const Checked = ({
  active,
  children,
}: {
  active: boolean;
  children: React.ReactNode;
}): JSX.Element =>
  active ? (
    <StrikeThrough>
      <MdCheckBox />
      <span>{children}</span>
    </StrikeThrough>
  ) : (
    <Line style={{ alignItems: "center" }}>
      <MdCheckBoxOutlineBlank />
      <span>{children}</span>
    </Line>
  );

export default Checked;
