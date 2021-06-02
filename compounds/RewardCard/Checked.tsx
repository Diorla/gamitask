import React from "react";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { StrikeThrough, Row } from "./Styled";

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
    <Row>
      <MdCheckBoxOutlineBlank />
      <span>{children}</span>
    </Row>
  );

export default Checked;
