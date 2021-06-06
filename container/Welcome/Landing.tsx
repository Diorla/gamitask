import styled from "styled-components";
import theme from "../../theme";

const Landing = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.6rem;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.palette.secondary.light}4d;
  background-image: url(../welcome/control.svg);
  background-repeat: no-repeat;
  background-position: ${theme.breakpoints.sm}px 20px;
`;

export default Landing;
