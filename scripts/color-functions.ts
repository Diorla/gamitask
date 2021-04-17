import Color from "color";

/**
 * Returns a darker shade of the color
 * @param color the colour that will be transformed
 * @param degree how much you want to change the shade from 0 to 1.
 * @returns color in hex mode
 * @example darken("#ade01a") //"#8AB315"
 * @example darken("#ade01a", 0.2) //"#8AB315"
 */
export const darken = (color: string, degree = 0.2) =>
  new Color(color).darken(degree).hex();

/**
 * Returns a lighter shade of the color
 * @param color the colour that will be transformed
 * @param degree how much you want to change the shade from 0 to 1.
 * @returns color in hex mode
 * @example lighten("#ade01a") //"#BEE943"
 * @example lighten("#ade01a", 0.2) //"#BEE943"
 */
export const lighten = (color: string, degree = 0.2) =>
  new Color(color).lighten(degree).hex();

/**
 * Returns white or black, in order to provide contrast for the colour.
 * @param color the colour that will be transformed
 * @returns color in hex mode
 * @example contrastColor("#ade01a") //"#000000"
 */
export const contrastColor = (color: string) =>
  new Color(color).isDark() ? "#ffffff" : "#000000";
