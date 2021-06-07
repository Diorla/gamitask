import styled from "styled-components";
import H1 from "../../atoms/H1";
import Line from "../../atoms/Line";
import Stack from "../../atoms/Stack";
import Text from "../../atoms/Text";
// CTA => Call To Action
const Wrapper = styled(Stack)`
  width: clamp(0px, 75%, 64rem);
  padding: 0.8rem;
  justify-content: center;
`;
export default function CTA(): JSX.Element {
  return (
    <Wrapper>
      <H1>slogan</H1>
      <Line style={{ flex: 0 }}>
        <Text>describeApp</Text>
      </Line>
    </Wrapper>
  );
}
