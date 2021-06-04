import React from "react";
import styled from "styled-components";
import Line from "../../atoms/Line";
import Stack from "../../atoms/Stack";
import { taskInfo } from "../../props/Reward";
import { numberType } from "../../scripts/formatMSToCountDown";
import Checked from "./Checked";
import Time from "./TimeWrapper";

export const TaskWrapper = styled(Stack)`
  padding: 0.4rem;
  color: ${({ theme }) => theme.palette.secondary.main};
  font-weight: bold;
`;

export const TimeWrapper = styled(Line)`
  padding: 0.4rem;
  color: ${({ theme }) => theme.palette.secondary.main};
  font-weight: bold;
`;

/**
 * For timed reward
 * @param param0 {{hh, mm, ss}}
 */
export default function Status({ data }: { data: numberType }): JSX.Element;

/**
 * For tasked reward
 * @param param0 task list and checked task list
 */
export default function Status({
  data,
  checklist,
}: {
  data: taskInfo[];
  checklist: string[];
}): JSX.Element;

export default function Status({
  data,
  checklist,
}: {
  data: any;
  checklist?: string[];
}): JSX.Element {
  if (checklist)
    return (
      <TaskWrapper>
        {data.map((item: { value: string; label: string }, idx: React.Key) => (
          <Checked active={checklist.includes(item.value)} key={idx}>
            {item.label}
          </Checked>
        ))}
      </TaskWrapper>
    );
  return (
    <TimeWrapper>
      <Time>
        <span>{("0" + data.hh).slice(-2)}</span>
        <span>hh</span>
      </Time>
      <Time>
        <span>{("0" + data.mm).slice(-2)}</span>
        <span>mm</span>
      </Time>
      <Time>
        <span>{("0" + data.ss).slice(-2)}</span>
        <span>ss</span>
      </Time>
    </TimeWrapper>
  );
}
