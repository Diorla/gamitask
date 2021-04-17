import { IconBaseProps } from "react-icons";
import { FaCalendarAlt, FaFlag } from "react-icons/fa";
import { GiAlarmClock } from "react-icons/gi";
import { IoMdArrowDropupCircle } from "react-icons/io";
import { MdLabel, MdRepeat } from "react-icons/md";
import { VscProject } from "react-icons/vsc";
import styled from "styled-components";

const Icon = (icon: {
  (props: IconBaseProps): JSX.Element;
  (props: IconBaseProps): JSX.Element;
}) => styled(icon)<{ colour: string; active: boolean }>`
  font-size: 1.6rem;
  cursor: pointer;
  margin: 0.4rem;
  color: ${({ colour, active }) => (active ? colour : "silver")};
`;

export const ReminderIcon = Icon(FaCalendarAlt);
export const LabelIcon = Icon(MdLabel);
export const PriorityIcon = Icon(FaFlag);
export const RepeatIcon = Icon(MdRepeat);
export const DifficultyIcon = Icon(IoMdArrowDropupCircle);
export const ProjectIcon = Icon(VscProject);
