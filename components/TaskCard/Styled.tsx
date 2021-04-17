import styled from "styled-components";

export const TaskWrapper = styled.div`
  border-bottom: 0.1rem solid silver;
  max-width: 48rem;
  margin: auto;
  margin-bottom: 1.8rem;
  padding: 0.4rem;
  cursor: pointer;
  &:hover > div > section {
    opacity: 1;
  }
`;

export const TaskChild = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Corner = styled.div`
  display: flex;
  align-items: center;
`;

export const RevealOnHover = styled.section`
  display: flex;
  align-items: center;
  transition: 0.2s linear;
  opacity: 0;
  & > svg {
    font-size: 1.8rem;
    cursor: pointer;
    margin: 0.2rem;
    color: ${({ theme }) => theme.palette.primary.main};
  }
  & > svg:hover {
    color: ${({ theme }) => theme.palette.primary.dark};
  }
`;
