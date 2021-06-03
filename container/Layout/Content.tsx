import styled from "styled-components";

export const Content = styled.div<{ showDrawer: boolean }>`
  flex: 1;
  position: absolute;
  left: 24rem;
  height: calc(100vh - 7rem);
  top: 5rem;
  overflow-y: scroll;
  width: calc(100% - 24rem);
  padding: 1rem;
  &::-webkit-scrollbar {
    width: 0.4rem;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar-thumb {
    background-color: silver;
    border: 0.4rem solid silver;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.sm + "px"}) {
      width: 100%;
      left: 0;
    }
  }
`;
