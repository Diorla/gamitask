//@ts-check
import { ThemeProvider } from "styled-components";
import { IntlProvider } from "react-intl";
import { useEffect, useState } from "react";
import UserProvider from "../context/userContext";
import TaskListProvider from "../context/taskListContext";
import "../styles/global.css";
import palette from "../theme/palette";
import transform from "../theme/transform";
import breakpoints from "../theme/breakpoints";
import elevation from "../theme/elevation";
import priority from "../theme/priority";
import lang from "../lang";
import "react-toastify/dist/ReactToastify.css";
import { TaskProvider } from "../context/taskContext";
import { ToastContainer } from "react-toastify";

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
    const savedLocale = localStorage.getItem("locale");
    setLocale(savedLocale || navigator.language);
  });

  const translation = lang(locale);
  return (
    <UserProvider>
      <IntlProvider messages={translation} locale={locale} defaultLocale="en">
        <ThemeProvider theme={theme}>
          <TaskListProvider>
            <TaskProvider>
              <Component {...pageProps} />
              <ToastContainer
                position="bottom-center"
                style={{ fontSize: "1.6rem" }}
                autoClose={3000}
              />
            </TaskProvider>
          </TaskListProvider>
        </ThemeProvider>
      </IntlProvider>
    </UserProvider>
  );
}
