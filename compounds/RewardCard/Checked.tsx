import React from "react";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import Line from "../../atoms/Line";
import { StrikeThrough } from "./Styled";

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
    <Line>
      <MdCheckBoxOutlineBlank />
      <span>{children}</span>
    </Line>
  );

export default Checked;
