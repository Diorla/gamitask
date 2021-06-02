import React, { useState, useRef } from "react";
import logout from "../../scripts/logout";
import Divider from "../Divider";
import Avatar from "../../atoms/Avatar";
import DropdownItem from "../../molecules/DropdownItem";
import { useClickAway } from "react-use";
import Card from "../../atoms/Card";
import Stack from "../../atoms/Stack";
import DropdownMenu from "./DropdownMenu";

export default function Dropdown({
  profileImage,
}: {
  profileImage: string;
}): JSX.Element {
  const imageUrl = profileImage || "./profile.png";

  const [showDropDownMenu, setShowDropDownMenu] = useState(false);
  const ref = useRef(null);
  useClickAway(ref, () => {
    setShowDropDownMenu(false);
  });

  return (
    <Stack ref={ref}>
      <Avatar
        src={imageUrl}
        onClick={() => setShowDropDownMenu(!showDropDownMenu)}
      />
      {showDropDownMenu && (
        <DropdownMenu>
          <Card elevation={3}>
            <Stack>
              <DropdownItem href="/profile" title="profile" />
              <DropdownItem href="/settings" title="settings" />
              <DropdownItem href="/help" title="help" />
              <DropdownItem href="/stats" title="stats" />
              <Divider />
              <DropdownItem onClick={logout} title="logOut" />
            </Stack>
          </Card>
        </DropdownMenu>
      )}
    </Stack>
  );
}
