import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  & > button {
    background: transparent;
    color: white;
    border: none;
    cursor: pointer;
  }
`;

export default function ToastControl({
  message,
  undo,
}: {
  message: string;
  undo?: () => void;
}) {
  return (
    <Wrapper>
      <span>{message}</span>
      {undo && <button onClick={undo}>Undo</button>}
    </Wrapper>
  );
}
