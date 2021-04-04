import UserProvider from "../context/userContext";
import "../styles/global.css";
import { ThemeProvider } from "styled-components";
import palette from "../theme/palette";
import transform from "../theme/transform";
import breakpoints from "../theme/breakpoints";
import elevation from "../theme/elevation";
import priority from "../theme/priority";

const theme = {
  breakpoints,
  elevation,
  palette,
  priority,
  transform,
};

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </ThemeProvider>
  );
}
