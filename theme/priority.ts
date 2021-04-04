import { Priority } from "styled-components";

const priority: Priority = {
  base: 1, // Everything else
  low: 100, // For elements with same parent
  header: 1000, // Above everything in the page, like header or footer
  modal: 1200, // Super imposed on the page like modals
  max: 1400, // Above everything
};

export default priority;
