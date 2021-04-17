import styled from "styled-components";

const Drawer = styled.div`
  width: 24rem;
  min-height: calc(100vh - 5rem);
  background-color: ${({ theme }) => theme.palette.default.light}66;
  user-select: none;

  position: absolute;
  height: 100vh;
  overflow-y: scroll;
  top: 0;

  &::-webkit-scrollbar {
    width: 0.2rem;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar-thumb {
    background-color: silver;
    border: 0.2rem solid silver;
  }
`;

export default Drawer;
