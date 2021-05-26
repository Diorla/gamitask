import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import styled from "styled-components";
import { useTaskDispatch, useTaskState } from "../../../context/taskContext";
import { addTask } from "../../../context/taskContext/actions";
import Periods from "./Periods";

const Select = styled.div`
  margin-bottom: 0.4rem;
  & > select {
    border: none;
    border-bottom: 0.1rem solid silver;
    padding: 0.4rem;
  }
  & > * {
    margin-top: 0.8rem;
  }
`;

export default function Reminder() {
  const taskDispatch = useTaskDispatch();
  const task = useTaskState();
  const { reminder } = task;
  const setReminder = (type: string) =>
    taskDispatch(
      addTask({
        ...task,
        reminder: {
          ...reminder,
          type,
        },
      })
    );
  const intl = useIntl();
  const { type = "daily" } = reminder;
  return (
    <div>
      <hr />
      <Select>
        <label htmlFor="period">
          <FormattedMessage id="selectPeriod" />:
        </label>
        <select
          name="period"
          id="period"
          value={type}
          onChange={(e) => setReminder(e.target.value)}
        >
          <option value="daily">
            {intl.formatMessage({
              id: "Daily",
              defaultMessage: "Daily",
            })}
          </option>
          <option value="weekly">
            {intl.formatMessage({
              id: "Weekly",
              defaultMessage: "Weekly",
            })}
          </option>
          <option value="monthly">
            {intl.formatMessage({
              id: "Monthly",
              defaultMessage: "Monthly",
            })}
          </option>
          <option value="yearly">
            {intl.formatMessage({
              id: "Yearly",
              defaultMessage: "Yearly",
            })}
          </option>
        </select>
      </Select>
      <Periods period={type} />
    </div>
  );
}
