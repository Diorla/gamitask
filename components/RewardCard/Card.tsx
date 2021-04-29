import React, { useState } from "react";
import { MdCheck, MdEdit } from "react-icons/md";
import {
  Wrapper,
  Left,
  Title,
  Centre,
  Bottom,
  Right,
  Row,
  Button,
} from "./Styled";

export default function Card({
  disabled,
  title,
  done,
  onCheck,
  children,
  toggleEdit,
}: {
  disabled: boolean;
  title: string;
  done: number[];
  onCheck: () => void;
  children: React.ReactNode;
  toggleEdit: () => void;
}) {
  const [collapse, setCollapse] = useState(true);
  return (
    <Wrapper disabled={disabled}>
      <Left>
        <Title onClick={() => setCollapse(!collapse)}>{title}</Title>
        {collapse ? null : (
          <>
            <Centre>{children}</Centre>
            <Bottom>
              <Button onClick={toggleEdit} variant="info">
                <MdEdit /> Edit
              </Button>
              <span>
                Last done:{" "}
                {done.length ? new Date(done[-1]).toDateString() : "Never"}
              </span>
            </Bottom>
          </>
        )}
      </Left>
      {disabled ? (
        <Right>
          <MdCheck />
        </Right>
      ) : (
        <Right onClick={onCheck}>
          <MdCheck />
        </Right>
      )}
    </Wrapper>
  );
}
