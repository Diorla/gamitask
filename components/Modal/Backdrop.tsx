import styled from "styled-components";

const StyledBackdrop = styled.div`
  position: fixed;
  top: 0;
  background: #0000004d;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  z-index: 1;
  left: 0;
`;
export default function Backdrop({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: (e: React.SyntheticEvent) => void;
}) {
  return <StyledBackdrop onClick={onClick}>{children}</StyledBackdrop>;
}
