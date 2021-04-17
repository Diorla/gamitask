import React, { useState } from "react";
import { MdChevronRight, MdKeyboardArrowDown } from "react-icons/md";
import styled from "styled-components";
import DrawerItem from "./DrawerItem";

const Styled = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Dropdown = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 1.6rem;
`;

export default function Accordion({ data, active }) {
  const { header, base, path, title, icons } = data;
  const [dropdownVisible, setDropdownVisible] = useState(path.includes(active));
  return (
    <Styled>
      <DrawerItem onClick={() => setDropdownVisible(!dropdownVisible)}>
        <Header>
          <span>{header}</span>
          {dropdownVisible ? <MdKeyboardArrowDown /> : <MdChevronRight />}
        </Header>
      </DrawerItem>
      {dropdownVisible && (
        <Dropdown>
          {path.map((item: string, idx: React.Key) => (
            <DrawerItem
              key={idx}
              href={`${base}/${item}`}
              icon={icons && icons[idx]}
              active={active === item}
            >
              {title[idx]}
            </DrawerItem>
          ))}
        </Dropdown>
      )}
    </Styled>
  );
}
