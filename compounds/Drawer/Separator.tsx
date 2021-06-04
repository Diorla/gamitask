import styled from "styled-components";

export default styled.div<{ size?: number }>`
  margin-top: ${({ size = 7 }) => size}rem;
`;
