import React from "react";
import { FormattedMessage } from "react-intl";
import RoundButton from "../atoms/RoundButton";
import Line from "../atoms/Line";

export interface CalendarButtonProps {
  /**
   * [sun, mon, tue, wed, thu, fri, sat]
   */
  list: string[];
  /**
   * [0, 1, 2, 3, 4, 5, 6]
   */
  activeList: number[];
  /**
   * returns the index of and the name of the item being clicked
   * return {index: 4, name: "mon"}
   */
  toggleDate: (item: { index: number; name: string }) => void;
}
export default function CalendarButton({
  list,
  activeList,
  toggleDate,
}: CalendarButtonProps): JSX.Element {
  return (
    <Line style={{ flexWrap: "wrap" }}>
      {list.map((item: string, index: number) => (
        <RoundButton
          key={index}
          active={activeList.includes(index)}
          onClick={() => toggleDate({ index, name: item })}
        >
          <FormattedMessage id={item} defaultMessage={item} />
        </RoundButton>
      ))}
    </Line>
  );
}
