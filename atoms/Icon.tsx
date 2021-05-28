import { IconBaseProps } from "react-icons";
import styled, { StyledComponent } from "styled-components";

export type IconType = StyledComponent<
  (props: IconBaseProps) => JSX.Element,
  any,
  {
    color?: string;
  },
  never
>;

const Icon = (IconElement: {
  (props: IconBaseProps): JSX.Element;
}): IconType => styled(IconElement)<{ color?: string }>`
  font-size: 2.1rem;
  cursor: pointer;
  margin: 0.4rem;
  color: ${({ color }) => color || "silver"};
`;

export default Icon;
