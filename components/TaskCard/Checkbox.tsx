import styled from "styled-components";

const Styled = styled.div`
  width: 20px;
  position: relative;
  margin-right: 4px;

  & label {
    width: 20px;
    height: 20px;
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    background: #fcfff4;
    background: linear-gradient(
      to bottom,
      #fcfff4 0%,
      #dfe5d7 40%,
      #b3bead 100%
    );
    border-radius: 4px;
  }
  & label:after {
    content: "";
    width: 9px;
    height: 5px;
    position: absolute;
    top: 4px;
    left: 4px;
    border: 3px solid #333;
    border-top: none;
    border-right: none;
    background: transparent;
    opacity: 0;
    transform: rotate(-45deg);
  }
  & label:hover::after {
    opacity: 0.5;
  }
  & input[type="checkbox"] {
    visibility: hidden;
  }
  & input[type="checkbox"]:checked + label:after {
    opacity: 1;
  }
`;

export default function Checkbox({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: any;
}) {
  return (
    <Styled className="exclude">
      <input
        type="checkbox"
        value="None"
        id="chb"
        name="check"
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor="chb" className="exclude"></label>
    </Styled>
  );
}
