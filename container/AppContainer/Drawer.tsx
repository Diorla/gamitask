import styled from "styled-components";

const Drawer = styled.div`
  width: 240px;
  min-height: calc(100vh - 50px);
  background-color: ${({ theme }) => theme.palette.default.light}66;
  user-select: none;

  position: absolute;
  height: 100vh;
  overflow-y: scroll;
  top: 0;

  &::-webkit-scrollbar {
    width: 2px;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar-thumb {
    background-color: silver;
    border: 2px solid silver;
  }
`;

export default Drawer;
