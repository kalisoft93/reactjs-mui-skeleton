import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
} from "@mui/material";

import CSidebarHeader from "./CSidebarHeader";
import CSidebarProfile from "./CSidebarProfile";

import MaterialIcon from "../../shared/MaterialIcon";
import { SidebarProps } from "../Sidebar";
import { useNavigate } from "react-router-dom";

const MobileSidebarWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  padding: "15px"
});

const SBListItem = styled(ListItem)({
  padding: "0px",
});

const SBListItemBtn = styled(ListItemButton)({
  padding: "13px",
});

const CollapsedSidebar = (props: SidebarProps) => {

  const navigation = useNavigate();

  const navigate = (link) => {
    navigation(link);
  }

  return (
    <MobileSidebarWrapper>
      <CSidebarHeader></CSidebarHeader>
      <Divider sx={{ m: "5px 0" }}></Divider>
      <CSidebarProfile></CSidebarProfile>
      <Divider sx={{ m: "5px 0" }}></Divider>
      <List sx={{ p: "0px" }}>
        {props.list.map((item, key) => {
          return (
            <SBListItem key={key} onClick={() => navigate(item.link)} >
              <SBListItemBtn>
                <ListItemIcon>
                  <MaterialIcon icon={item.icon}></MaterialIcon>
                </ListItemIcon>
                <ListItemText primary="" />
              </SBListItemBtn>
            </SBListItem>
          );
        })}
      </List>
    </MobileSidebarWrapper>
  );
};

export default CollapsedSidebar;
