import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  :root {
    font-size: 10px;
  }
`;

const StyledWrapper = styled.div`
  font-family: "Segoe UI", Roboto, "Helvetica Neue", Arial, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol";
  background-color: ${({ theme }) => theme.palette.default.main};
  color: ${({ theme }) => theme.palette.default.text};
  font-size: 10px;
  min-height: 200px;
`;

const Wrapper = ({ children }) => (
  <StyledWrapper>
    <GlobalStyle />
    {children}
  </StyledWrapper>
);

export default Wrapper;
