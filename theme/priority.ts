import { Priority } from "styled-components";

const priority: Priority = {
  base: 1, // Everything else
  low: 2, // For elements with same parent, just to raise above others
  header: 4, // Above everything in the page, like header or footer
  modal: 8, // Super imposed on the page like modals
  max: 16, // Above everything
};

export default priority;
