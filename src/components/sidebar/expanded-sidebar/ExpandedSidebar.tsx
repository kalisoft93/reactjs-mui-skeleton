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
import { useNavigate } from "react-router-dom";
import MaterialIcon from "../../shared/MaterialIcon";
import { SidebarProps } from "../Sidebar";
import ESidebarHeader from "./ESidebarHeader";
import ESidebarProfile from "./ESidebarProfile";

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

const ExpandedSidebar = (props: SidebarProps) => {

  const navigation = useNavigate();

  const navigate = (link) => {
    navigation(link);
  }

  return (
    <SidebarContainer>
      <Box sx={{ p: "0px 5px" }}>
        <ESidebarHeader></ESidebarHeader>
      </Box>
      <Divider sx={{ m: "15px 0px" }} orientation="horizontal"></Divider>
      <Box sx={{ p: "0px 5px" }}>
        <ESidebarProfile></ESidebarProfile>
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
                  <ListItemText onClick={() => navigate(item.link)} sx={{whiteSpace: 'nowrap'}} primary={item.label} />
              </SBListItemBtn>
            </SBListItem>
          );
        })}
      </List>
    </SidebarContainer>
  );
};

export default ExpandedSidebar;
