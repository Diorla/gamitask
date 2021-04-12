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
  margin-top: 50px;
  display: flex;
`;

const Seperator = styled.div<{ size?: number }>`
  margin-top: ${({ size = 50 }) => size}px;
`;

const Content = styled.div`
  flex: 1;
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
        <Seperator />
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
        <Seperator size={20} />
        <DifficultyDD active={active} />
        <PriorityDD active={active} />
      </Drawer>
      <Content>{children}</Content>
    </Wrapper>
  );
}
