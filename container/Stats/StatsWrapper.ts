import styled from "styled-components";

// & [aria-label="desc"] .caret {
//   border-left: 5px solid transparent;
//   border-right: 5px solid transparent;
//   border-bottom: 5px solid;
//   margin-bottom: 2px !important;
//   display: inline-block;
// }
// & [aria-label="asc"] .caret {
//   border-left: 5px solid transparent;
//   border-right: 5px solid transparent;
//   border-top: 5px solid;
//   margin-bottom: 2px !important;
//   display: inline-block;
// }
// react-bootstrap-table-sort-order
const StatsWrapper = styled.div`
  & table {
    border: 1px solid silver;
    border-collapse: collapse;
  }
  & th,
  td {
    border: 1px solid silver;
    padding: 2px;
    text-align: center;
    min-width: 75px;
  }
  & td:first-child {
    text-align: start;
  }
  & .react-bootstrap-table-sort-order .caret {
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid;
  margin-bottom: 2px !important;
  display: inline-block;
}
`;

export default StatsWrapper;
