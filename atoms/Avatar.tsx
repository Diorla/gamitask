import styled from "styled-components";

export default styled.img<{ size?: string }>`
  height: ${({ size = "3.2rem" }) => size};
  width: ${({ size = "3.2rem" }) => size};
  border-radius: 50%;
  cursor: pointer;
  margin: 0.4rem;
`;
