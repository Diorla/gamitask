import styled from "styled-components";

const StyledBox = styled.div<{ width?: number }>`
  background: white;
  width: ${({ width }) => (width ? width + "px" : "80%")};
  min-width: 300px;
  min-height: 100px;
  border-radius: 4px;
  padding: 2px;
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
