import styled from "styled-components";
import Button from "../../atoms/Button";
import Line from "../../atoms/Line";
import Link from "../../atoms/Link";

const Row = styled(Line)`
  flex: 0;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.2rem;
`;
export default function Top({
  openNewUser,
  openOldUser,
}: {
  openNewUser: () => void;
  openOldUser: () => void;
}): JSX.Element {
  return (
    <Row>
      <h2>Gamitask</h2>
      <Line style={{ alignItems: "center", justifyContent: "flex-end" }}>
        <Link
          variant="primary"
          style={{ marginRight: "0.8rem", fontWeight: "bolder" }}
          onClick={openOldUser}
        >
          login
        </Link>
        <Button variant="primary" onClick={openNewUser}>
          join
        </Button>
      </Line>
    </Row>
  );
}
