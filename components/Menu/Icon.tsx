import { IconBaseProps } from "react-icons";
import {
  MdAdd,
  MdTrendingUp,
  MdNotifications,
  MdAccountCircle,
  MdMenu,
} from "react-icons/md";
import styled from "styled-components";

const Icon = (icon: {
  (props: IconBaseProps): JSX.Element;
  (props: IconBaseProps): JSX.Element;
}) => styled(icon)`
  font-size: 3.2rem;
  cursor: pointer;
  margin: 0.4rem;
  color: ${({ theme }) => theme.palette.default.main};
`;

const MenuIcon = Icon(MdMenu);
const AddIcon = Icon(MdAdd);
const PointIcon = Icon(MdTrendingUp);
const NotificationIcon = Icon(MdNotifications);
const UserIcon = Icon(MdAccountCircle);

export {
  MenuIcon,
  AddIcon,
  PointIcon,
  NotificationIcon,
  UserIcon,
  Icon as default,
};
