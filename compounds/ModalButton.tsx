import styled from "styled-components";

export default styled.button<{ variant: string }>`
  font-size: 1.6rem;
  font-family: monospace;
  border: none;
  background: ${({ theme, variant }) => theme.palette[variant].dark};
  color: white;
  cursor: pointer;
  margin: 0.4rem;
  padding: 0.2rem 0.4rem;
  box-shadow: ${({ theme }) => theme.elevation[1]}
  &:disabled {
    opacity: 0.6;
  }
`;
