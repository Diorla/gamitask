import styled from "styled-components";

const Styled = styled.div`
  width: 2rem;
  position: relative;
  margin-right: 0.8rem;
  & label {
    width: 2.4rem;
    height: 2.4rem;
    cursor: pointer;
    position: absolute;
    top: -0.4rem;
    left: 0;
    background: #fcfcfc;
    background: linear-gradient(
      to bottom,
      #fcfcfc 0%,
      #dfe5d7 40%,
      #b3bead 100%
    );
    border-radius: 0.4rem;
  }
  & label:after {
    content: "";
    width: 1.2rem;
    height: 0.8rem;
    position: absolute;
    top: 0.6rem;
    left: 0.6rem;
    border: 0.3rem solid #333;
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
}): JSX.Element {
  const id = "s" + Math.floor(Math.random() * 1000000000000);
  return (
    <Styled className="exclude">
      <input
        type="checkbox"
        value="None"
        id={id}
        name="check"
        checked={checked}
        onChange={onChange}
        className="exclude"
      />
      <label htmlFor={id} className="exclude"></label>
    </Styled>
  );
}
