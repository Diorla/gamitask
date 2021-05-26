import React from "react";
import { FormattedMessage } from "react-intl";
import formatMsToCountDown from "../../scripts/formatMSToCountDown";
import toMS from "../../scripts/toMS";

const sixty = new Array(60);
sixty.fill(1);

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
    <div>
      <select
        placeholder="hh"
        onChange={(e) => updateTime(Number(e.target.value), "hh")}
        value={time.hh}
      >
        {sixty.map((_item, idx) => (
          <option value={idx}>{("0" + idx).slice(-2)}</option>
        ))}
      </select>
      <FormattedMessage id="hours" />{" "}
      <select
        placeholder="mm"
        onChange={(e) => updateTime(Number(e.target.value), "mm")}
        value={time.mm}
      >
        {sixty.map((_item, idx) => (
          <option value={idx}>{("0" + idx).slice(-2)}</option>
        ))}
      </select>
      <FormattedMessage id="minutes" />{" "}
      <select
        placeholder="ss"
        onChange={(e) => updateTime(Number(e.target.value), "ss")}
        value={time.ss}
      >
        {sixty.map((_item, idx) => (
          <option value={idx}>{("0" + idx).slice(-2)}</option>
        ))}
      </select>
      <FormattedMessage id="seconds" />{" "}
    </div>
  );
};

export default TimerSelect;
