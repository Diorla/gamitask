import styled from "styled-components";

const StyledBox = styled.div<{ width?: number }>`
  background: white;
  width: ${({ width }) => (width ? width + "rem" : "80%")};
  min-width: 30rem;
  min-height: 10rem;
  border-radius: 0.4rem;
  padding: 0.2rem;
`;
export default function Box({
  children,
  width,
}: {
  children: React.ReactNode;
  width?: number;
}) {
  return <StyledBox width={width}>{children}</StyledBox>;
}
