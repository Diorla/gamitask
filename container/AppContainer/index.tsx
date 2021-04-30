import styled from "styled-components";
import Drawer from "./Drawer";
import DrawerItem from "./DrawerItem";
import { MdArchive, MdLabel, MdToday } from "react-icons/md";
import React from "react";
import { FaCalendarAlt, FaGift } from "react-icons/fa";
import { VscProject } from "react-icons/vsc";
import DifficultyDD from "./DifficultyDD";
import PriorityDD from "./PriorityDD";

/**
 * TODO: Usememo
 * Memoised some values especially when it comes to useContext to speed up things
 */
const Seperator = styled.div<{ size?: number }>`
  margin-top: ${({ size = 7 }) => size}rem;
`;

export default function AppContainer({
  activePath,
  showDrawer,
}: {
  activePath: string;
  showDrawer: boolean;
}) {
  return (
    <Drawer reveal={showDrawer}>
      <Seperator size={11} />
      <DrawerItem
        href="/"
        active={activePath === "today"}
        icon={<MdToday />}
        iconColor="info"
      >
        Today
      </DrawerItem>
      <DrawerItem
        href="/upcoming"
        icon={<FaCalendarAlt />}
        iconColor="secondary"
        active={activePath === "upcoming"}
      >
        Upcoming
      </DrawerItem>
      <DrawerItem
        href="/labels"
        icon={<MdLabel />}
        iconColor="warning"
        active={activePath === "labels"}
      >
        Labels
      </DrawerItem>
      <DrawerItem
        href="/projects"
        icon={<VscProject />}
        iconColor="primary"
        active={activePath === "projects"}
      >
        Projects
      </DrawerItem>
      <DrawerItem
        href="/rewards"
        icon={<FaGift />}
        iconColor="success"
        active={activePath === "rewards"}
      >
        Rewards
      </DrawerItem>
      <DrawerItem
        href="/archive"
        icon={<MdArchive />}
        iconColor="error"
        active={activePath === "archive"}
      >
        Archive
      </DrawerItem>
      <Seperator size={2} />
      <DifficultyDD activePath={activePath} />
      <PriorityDD activePath={activePath} />
    </Drawer>
  );
}
