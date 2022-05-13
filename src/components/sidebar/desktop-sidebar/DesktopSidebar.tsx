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
import MaterialIcon from "../../shared/MaterialIcon";
import { SidebarProps } from "../Sidebar";
import DSidebarHeader from "./DSidebarHeader";
import DSidebarProfile from "./DSidebarProfile";

const SidebarContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  padding: "15px",
  overflow: "hidden"
});

const SBListItem = styled(ListItem)({
  padding: "0px",
});

const SBListItemBtn = styled(ListItemButton)({
  padding: "10px 10px",
});

const DesktopSidebar = (props: SidebarProps) => {


  return (
    <SidebarContainer>
      <Box sx={{ p: "0px 5px" }}>
        <DSidebarHeader></DSidebarHeader>
      </Box>
      <Divider sx={{ m: "15px 0px" }} orientation="horizontal"></Divider>
      <Box sx={{ p: "0px 5px" }}>
        <DSidebarProfile></DSidebarProfile>
      </Box>
      <Divider sx={{ m: "15px 0px" }} orientation="horizontal"></Divider>
      <List sx={{ p: "0px" }}>
        {props.list.map((item, key) => {
          return (
            <SBListItem key={key}>
              <SBListItemBtn>
                <ListItemIcon>
                  <MaterialIcon icon={item.icon}></MaterialIcon>
                </ListItemIcon>
                <ListItemText sx={{whiteSpace: 'nowrap'}} primary={item.label} />
              </SBListItemBtn>
            </SBListItem>
          );
        })}
      </List>
    </SidebarContainer>
  );
};

export default DesktopSidebar;
