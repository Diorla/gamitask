import { useIntl } from "react-intl";
import styled from "styled-components";
import variantProps from "../props/variantProps";

const Span = styled.span<{ variant?: variantProps }>`
  color: ${({ theme, variant }) =>
    variant ? theme.palette[variant].main : "black"};
`;

export default function Text({
  children,
  variant,
}: {
  children: string;
  variant?: variantProps;
}): JSX.Element {
  const intl = useIntl();
  return (
    <Span variant={variant}>
      {intl.formatMessage({
        id: children,
        defaultMessage: children,
      })}
    </Span>
  );
}
