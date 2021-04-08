import styled from "styled-components";

const Drawer = styled.div`
  width: 280px;
  min-height: calc(100vh - 70px);
  background-color: ${({ theme }) => theme.palette.default.light}66;
  user-select: none;
`;

export default Drawer;