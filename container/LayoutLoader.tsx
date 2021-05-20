import React from "react";
import styled from "styled-components";
import palette from "../theme/palette";

const Wrapper = styled.div`
  overflow: hidden;
  position: absolute;
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function LayoutLoader(): JSX.Element {
  return (
    <Wrapper>
      <div
        className="spinner-border"
        style={{ width: "8rem", height: "8rem", color: palette.primary.main }}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </Wrapper>
  );
}
