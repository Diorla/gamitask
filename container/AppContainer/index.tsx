import styled from "styled-components";
import Drawer from "./Drawer";
import DrawerItem from "./DrawerItem";
import { MdLabel, MdToday } from "react-icons/md";
import React from "react";
import { FaCalendarAlt, FaGift } from "react-icons/fa";
import { VscProject } from "react-icons/vsc";
import DifficultyDD from "./DifficultyDD";
import PriorityDD from "./PriorityDD";

const Wrapper = styled.div`
  display: flex;
`;

const Seperator = styled.div<{ size?: number }>`
  margin-top: ${({ size = 7 }) => size}rem;
`;

const Content = styled.div`
  flex: 1;
  position: absolute;
  width: calc(100% - 24rem);
  left: 24rem;
  height: calc(100vh - 5rem);
  top: 5rem;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0.2rem;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar-thumb {
    background-color: silver;
    border: 0.2rem solid silver;
  }
`;

export default function AppContainer({
  children,
  active,
}: {
  children: React.ReactNode;
  active: string;
}) {
  return (
    <Wrapper>
      <Drawer>
        <Seperator size={10}/>
        <DrawerItem
          href="/"
          active={active === "today"}
          icon={<MdToday />}
          iconColor="info"
        >
          Today
        </DrawerItem>
        <DrawerItem
          href="/upcoming"
          icon={<FaCalendarAlt />}
          iconColor="secondary"
          active={active === "upcoming"}
        >
          Upcoming
        </DrawerItem>
        <DrawerItem
          href="/labels"
          icon={<MdLabel />}
          iconColor="warning"
          active={active === "labels"}
        >
          Labels
        </DrawerItem>
        <DrawerItem
          href="/projects"
          icon={<VscProject />}
          iconColor="primary"
          active={active === "projects"}
        >
          Projects
        </DrawerItem>
        <DrawerItem
          href="/rewards"
          icon={<FaGift />}
          iconColor="success"
          active={active === "rewards"}
        >
          Rewards
        </DrawerItem>
        <Seperator size={2} />
        <DifficultyDD active={active} />
        <PriorityDD active={active} />
      </Drawer>
      <Content>{children}</Content>
    </Wrapper>
  );
}
