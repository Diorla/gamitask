import { Palette } from "styled-components";

const primaryColor = "#7843bc";
const primaryLight = "#ab71ef";
const primaryDark = "#46158b";
const primaryText = "#ffffff";
const secondaryColor = "#87bc43";
const secondaryLight = "#baef73";
const secondaryDark = "#568c0c";
const secondaryText = "#000000";

const white = "#ffffff";
const black = "#000000";
const offwhite = "#dddddd";
const gray = "#333333";

const cornflowerblue = "cornflowerblue";
const blue = "cornflowerblue";
const purple = "#673ab7";

// TODO: create a valid function
const darken = (a: string) => a;
const lighten = (a: string) => a;

const error = {
  main: "#e83c3d",
  dark: darken("#e83c3d"),
  light: lighten("#e83c3d"),
};

const warning = {
  main: "#ffac03",
  dark: darken("#ffac03"),
  light: lighten("#ffac03"),
};

const info = {
  main: "#17b0f1",
  dark: darken("#17b0f1"),
  light: lighten("#17b0f1"),
};

const success = {
  main: "#329b52",
  dark: darken("#329b52"),
  light: lighten("#329b52"),
};

const palette: Palette = {
  primary: {
    main: primaryColor,
    light: primaryLight,
    dark: primaryDark,
    text: primaryText,
  },
  secondary: {
    main: secondaryColor,
    light: secondaryLight,
    dark: secondaryDark,
    text: secondaryText,
  },
  default: {
    main: white,
    dark: gray,
    light: offwhite,
    text: black,
  },
  link: {
    color: cornflowerblue,
    visited: purple,
    hover: blue,
    focus: blue,
    active: blue,
  },
  error,
  warning,
  info,
  success,
};

export default palette;
