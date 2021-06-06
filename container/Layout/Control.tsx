import React, { useState } from "react";
import Menu from "../../compounds/Menu";
import RunningTask from "../../compounds/TaskCard/RunningTask";
import Drawer from "../../compounds/Drawer";
import Welcome from "../Welcome";
import { Content } from "./Content";
import NonTaskContainer from "./NonTaskContainer";
import theme from "../../theme";
import { useMedia } from "react-use";

export default function Control({
  uid,
  children,
  activePath,
  id,
  hideMenu,
}: {
  uid: string;
  children: React.ReactNode;
  activePath: string;
  id: string;
  hideMenu: boolean;
}): JSX.Element {
  const [showDrawer, setShowDrawer] = useState(false);
  const { breakpoints } = theme;
  const isMobile = useMedia(`(max-width: ${breakpoints.sm}px)`);

  if (uid) {
    if (hideMenu)
      return <NonTaskContainer title={activePath}>{children}</NonTaskContainer>;
    return (
      <div style={{ fontSize: "1.6rem" }}>
        <Menu onClick={() => setShowDrawer(!showDrawer)} />
        <Drawer
          showDrawer={showDrawer}
          activePath={activePath}
          isMobile={isMobile}
        />
        <Content showDrawer={showDrawer} onClick={() => setShowDrawer(false)}>
          {id && <RunningTask />}
          {children}
        </Content>
      </div>
    );
  }
  return <Welcome />;
}
