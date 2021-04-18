import Task from "../../props/Task";
import formatDateTime from "./formatDateTime";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import CountDown from "./CountDown";
import styled from "styled-components";
import { FaFlag } from "react-icons/fa";
import {
  FcHighPriority,
  FcLowPriority,
  FcMediumPriority,
} from "react-icons/fc";
import React from "react";
import { contrastColor } from "../../scripts/color-functions";
dayjs.extend(localizedFormat);

const colourScale = ["success", "info", "primary", "warning", "error"];
const Flag = styled(FaFlag)<{ index: number }>`
  color: ${({ theme, index }) => theme.palette[colourScale[index]].main};
`;

const Difficulty = ({ index }) => {
  if (index === 1) return <FcLowPriority />;
  if (index === 2) return <FcMediumPriority />;
  if (index === 2) return <FcHighPriority />;
  return null;
};
const convertKeyToNumber = (key: string) => Number(key.slice(1));

const Styled = styled.div`
  display: flex;
  flex-direction: column;
  & em {
    display: inline-block;
    margin-right: 0.4rem;
    font-size: 1.8rem;
  }
  & table {
    margin: auto;
    background: ${({ theme }) => theme.palette.tertiary.main}80;
    color: ${({ theme }) => contrastColor(theme.palette.tertiary.main)};
    border-radius: 8px;
    padding: 8px;
  }
  & td {
    padding: 4px 8px;
    border-bottom: 1px solid;
  }
  & td:first-child {
    border-right: 1px solid;
  }
  & tr:last-child > td {
    border-bottom: none;
  }
`;

const ProjectDiv = styled.div`
  text-transform: uppercase;
  font-weight: 500;
  background: ${({ theme }) => theme.palette.secondary.main};
  color: white;
  display: inline-block;
  padding: 0.4rem;
`;

const Header = styled.h2`
  text-align: center;
  margin-bottom: 0;
  & > svg {
    margin-left: 0.4rem;
  }
`;

const Time = styled.div`
  text-align: center;
`;

export default function TaskDetails({ data }: { data: Task }) {
  const latestList = Object.keys(data.countdowns)
    .map(convertKeyToNumber)
    .sort((prev, next) => next - prev);
  console.log({ latestList });
  const { priority, difficulty, labels = "" } = data;
  return (
    <Styled>
      <Header>
        {data.name}
        {priority && <Flag index={priority} />}
        {difficulty && <Difficulty index={difficulty} />}
      </Header>
      <Time>{formatDateTime(data)}</Time>
      <div style={{ padding: "0.8rem" }}>
        <ProjectDiv>{data.project}</ProjectDiv>
        <div>{labels ? <em>{labels}</em> : null}</div>
        {latestList.length ? (
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Length</th>
              </tr>
            </thead>
            <tbody>
              {latestList.map((item, idx) => {
                const key = "t" + item;
                const value = data.countdowns[key];
                const date = dayjs(item).format("lll");
                return (
                  <tr key={idx}>
                    <td>{date}</td>
                    <td>
                      <CountDown time={value} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : null}
      </div>
    </Styled>
  );
}
