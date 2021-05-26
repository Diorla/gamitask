import React from "react";
import Line from "../../atoms/Line";
import NumberSelect from "../../molecules/NumberSelect";
import formatMsToCountDown from "../../scripts/formatMSToCountDown";
import toMS from "../../scripts/toMS";

const TimerSelect = ({
  onChangeTime,
  value,
}: {
  onChangeTime: (e: number) => void;
  value: number;
}) => {
  const time = formatMsToCountDown(value);

  const updateTime = (value: number, type: string) => {
    let totalValue = 0;
    const { hh, mm, ss } = time;
    if (type === "hh")
      totalValue =
        toMS(value, "hour") + toMS(mm, "minute") + toMS(ss, "second");
    if (type === "mm")
      totalValue =
        toMS(hh, "hour") + toMS(value, "minute") + toMS(ss, "second");
    if (type === "ss")
      totalValue =
        toMS(hh, "hour") + toMS(mm, "minute") + toMS(value, "second");
    onChangeTime(totalValue);
  };

  return (
    <Line style={{ alignItems: "center" }}>
      <NumberSelect
        label="hours"
        onChange={(e) => updateTime(Number(e.target.value), "hh")}
        value={time.hh}
        range={[0, 59]}
      />
      <NumberSelect
        label="minutes"
        onChange={(e) => updateTime(Number(e.target.value), "mm")}
        value={time.mm}
        range={[0, 59]}
      />
      <NumberSelect
        label="seconds"
        onChange={(e) => updateTime(Number(e.target.value), "ss")}
        value={time.ss}
        range={[0, 59]}
      />
    </Line>
  );
};

export default TimerSelect;
