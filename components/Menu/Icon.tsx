import { IconBaseProps } from "react-icons";
import {
  MdAdd,
  MdTrendingUp,
  MdNotifications,
  MdAccountCircle,
} from "react-icons/md";
import { TiPointOfInterest } from "react-icons/ti";
import styled from "styled-components";

const Icon = (icon: {
  (props: IconBaseProps): JSX.Element;
  (props: IconBaseProps): JSX.Element;
}) => styled(icon)`
  font-size: 32px;
  cursor: pointer;
  margin: 4px;
`;

const MenuIcon = Icon(TiPointOfInterest);
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
