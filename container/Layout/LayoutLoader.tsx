import React from "react";
import Skeleton from "../../atoms/Skeleton";
import Spinner from "../../atoms/Spinner";
import Stack from "../../atoms/Stack";
import theme from "../../theme";

export default function LayoutLoader(): JSX.Element {
  const {
    palette: {
      primary: { light, main },
    },
  } = theme;
  return (
    <Stack>
      <Skeleton height="5rem" backgroundColor={main} foregroundColor={light} />
      <Spinner />
    </Stack>
  );
}
