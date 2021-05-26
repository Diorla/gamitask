import { useIntl } from "react-intl";

/**
 * Use this to break sentences into bits and pass it through translation
 */
export default function Text({ children }: { children: string }) {
  const intl = useIntl();
  return (
    <>
      {intl.formatMessage({
        id: children,
        defaultMessage: children,
      })}
    </>
  );
}
