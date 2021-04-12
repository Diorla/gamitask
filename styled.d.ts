import "styled-components";

// TODO: Use storyx theme and change colours to purple, chocolate and gold
declare module "styled-components" {
  // device breakpoints
  export interface Breakpoints {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  }

  // shadow
  export interface Elevation {
    0: string;
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
    6: string;
    7: string;
    8: string;
    9: string;
    10: string;
  }

  //z-index
  export interface Priority {
    base: number;
    low: number;
    header: number;
    modal: number;
    max: number;
  }

  // colours
  export interface Palette {
    primary: {
      main: string;
      dark: string;
      light: string;
      text: string;
    };
    secondary: {
      main: string;
      dark: string;
      light: string;
      text: string;
    };
    default: {
      main: string;
      dark: string;
      light: string;
      text: string;
    };
    link: {
      color: string;
      visited?: string;
      hover?: string;
      focus?: string;
      active?: string;
    };
    error: {
      main: string;
      dark: string;
      light: string;
    };
    warning: {
      main: string;
      dark: string;
      light: string;
    };
    info: {
      main: string;
      dark: string;
      light: string;
    };
    success: {
      main: string;
      dark: string;
      light: string;
    };
  }

  // animation
  export interface Transform {
    /**
     * ?//TODO: Expand transition to quick, medium and slow
     */
    transition: string;
    animation: string;
  }
}
