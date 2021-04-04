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
    dark: black,
    light: offwhite,
    text: gray,
  },
  link: {
    color: cornflowerblue,
    visited: purple,
    hover: blue,
    focus: blue,
    active: blue,
  },
};

export default palette;
