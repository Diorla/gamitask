import { ThemeProvider } from "styled-components";
import { IntlProvider } from "react-intl";
import { useEffect, useState } from "react";
import UserProvider from "../context/userContext";
import "../styles/global.css";
import palette from "../theme/palette";
import transform from "../theme/transform";
import breakpoints from "../theme/breakpoints";
import elevation from "../theme/elevation";
import priority from "../theme/priority";
import lang from "../lang";

const theme = {
  breakpoints,
  elevation,
  palette,
  priority,
  transform,
};

export default function App({ Component, pageProps }) {
  const [locale, setLocale] = useState("en");
  useEffect(() => {
    setLocale(navigator.language);
  });

  const translation = lang(locale)
  return (
    <UserProvider>
      <IntlProvider
        messages={translation}
        locale={locale}
        defaultLocale="en"
      >
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </IntlProvider>
    </UserProvider>
  );
}
