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
// Replace with skeleton
export default function PageLoader(): JSX.Element {
  return (
    <Wrapper>
      <div
        className="spinner-grow"
        style={{ width: "8rem", height: "8rem", color: palette.primary.main }}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </Wrapper>
  );
}
