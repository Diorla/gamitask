import styled from "styled-components";

const Drawer = styled.div<{ reveal: boolean }>`
  width: 24rem;
  min-height: calc(100vh - 5rem);
  background-color: ${({ theme }) => theme.palette.default.light};
  user-select: none;
  z-index: ${({ theme }) => theme.priority.low};
  position: absolute;
  height: 100vh;
  overflow-y: scroll;
  top: 0;
  transition: ${({ theme }) => theme.transform.duration.short} linear;
  &::-webkit-scrollbar {
    width: 0.2rem;
    background-color: #f5f5f5;
  }
  &::-webkit-scrollbar-thumb {
    background-color: silver;
    border: 0.2rem solid silver;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.sm + "px"}) {
    width: ${({ reveal }) => (reveal ? "24rem" : 0)};
    }
  }
`;
export default Drawer;
