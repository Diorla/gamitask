import styled from "styled-components";

export default styled.div<{ elevation?: number }>`
  box-shadow: ${({ theme, elevation = 1 }) => theme.elevation[elevation]};
`;
