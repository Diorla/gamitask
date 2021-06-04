import DrawerWrapper from "./DrawerWrapper";
import { MdArchive, MdToday } from "react-icons/md";
import React from "react";
import { FaCalendarAlt, FaFlag, FaGift, FaTag } from "react-icons/fa";
import { VscProject } from "react-icons/vsc";
import { FcLowPriority } from "react-icons/fc";
import DrawerItem from "../../molecules/DrawerItem";
import Separator from "./Separator";

export default function AppContainer({
  activePath,
  showDrawer,
}: {
  activePath: string;
  showDrawer: boolean;
}): JSX.Element {
  return (
    <DrawerWrapper reveal={showDrawer}>
      <Separator size={11} />
      <DrawerItem
        href="/"
        active={activePath === "today"}
        icon={<MdToday />}
        iconColor="info"
        title="today"
      />
      <DrawerItem
        href="/upcoming"
        icon={<FaCalendarAlt />}
        iconColor="secondary"
        active={activePath === "upcoming"}
        title="upcoming"
      />
      <DrawerItem
        href="/labels"
        icon={<FaTag />}
        iconColor="warning"
        active={activePath === "labels"}
        title="labels"
      />
      <DrawerItem
        href="/projects"
        icon={<VscProject />}
        iconColor="primary"
        active={activePath === "projects"}
        title="projects"
      />
      <DrawerItem
        href="/rewards"
        icon={<FaGift />}
        iconColor="success"
        active={activePath === "rewards"}
        title="rewards"
      />
      <DrawerItem
        href="/archive"
        icon={<MdArchive />}
        iconColor="error"
        active={activePath === "archive"}
        title="archive"
      />
      <Separator size={2} />
      <DrawerItem
        href="/difficulty"
        icon={<FcLowPriority />}
        iconColor="error"
        active={activePath === "difficulty"}
        title="difficulty"
      />
      <DrawerItem
        href="/priority"
        icon={<FaFlag />}
        iconColor="error"
        active={activePath === "priority"}
        title="priority"
      />
    </DrawerWrapper>
  );
}
