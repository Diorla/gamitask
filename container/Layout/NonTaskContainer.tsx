import NonTaskWrapper from "./NonTaskWrapper";
import NonTaskHeader from "./NonTaskHeader";
import { NonTaskBody } from "./NonTaskBody";

export default function NonTaskContainer({
  children,
  title,
}: {
  title: string;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <NonTaskWrapper>
      <NonTaskHeader title={title} />
      <NonTaskBody>{children}</NonTaskBody>
    </NonTaskWrapper>
  );
}
