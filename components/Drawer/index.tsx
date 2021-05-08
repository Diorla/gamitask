import styled from "styled-components";
import DrawerWrapper from "./DrawerWrapper";
import DrawerItem from "./DrawerItem";
import { MdArchive, MdToday } from "react-icons/md";
import React from "react";
import { FaCalendarAlt, FaGift, FaTag } from "react-icons/fa";
import { VscProject } from "react-icons/vsc";
import DifficultyExpand from "./DifficultyExpand";
import PriorityExpand from "./PriorityExpand";
import { FormattedMessage } from "react-intl";

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
    <DrawerWrapper reveal={showDrawer}>
      <Seperator size={11} />
      <DrawerItem
        href="/"
        active={activePath === "today"}
        icon={<MdToday />}
        iconColor="info"
      >
        <FormattedMessage id="Today" defaultMessage="Today" />
      </DrawerItem>
      <DrawerItem
        href="/upcoming"
        icon={<FaCalendarAlt />}
        iconColor="secondary"
        active={activePath === "upcoming"}
      >
        <FormattedMessage id="Upcoming" defaultMessage="Upcoming" />
      </DrawerItem>
      <DrawerItem
        href="/labels"
        icon={<FaTag />}
        iconColor="warning"
        active={activePath === "labels"}
      >
        <FormattedMessage id="Labels" defaultMessage="Labels" />
      </DrawerItem>
      <DrawerItem
        href="/projects"
        icon={<VscProject />}
        iconColor="primary"
        active={activePath === "projects"}
      >
        <FormattedMessage id="Projects" defaultMessage="Projects" />
      </DrawerItem>
      <DrawerItem
        href="/rewards"
        icon={<FaGift />}
        iconColor="success"
        active={activePath === "rewards"}
      >
        <FormattedMessage id="Rewards" defaultMessage="Rewards" />
      </DrawerItem>
      <DrawerItem
        href="/archive"
        icon={<MdArchive />}
        iconColor="error"
        active={activePath === "archive"}
      >
        <FormattedMessage id="Archive" defaultMessage="Archive" />
      </DrawerItem>
      <Seperator size={2} />
      <DifficultyExpand activePath={activePath} />
      <PriorityExpand activePath={activePath} />
    </DrawerWrapper>
  );
}
