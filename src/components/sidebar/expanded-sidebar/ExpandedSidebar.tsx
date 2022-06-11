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
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  margin: "5px 0",
  '&.active': {
    background: '#ea2c6d',
    borderRadius: '11px',
    color: 'white'
  }
});

const SBListItemBtn = styled(ListItemButton)({
  padding: "5px 10px",

});

const ExpandedSidebar = (props: SidebarProps) => {

  const [list, setList] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const list = props.list;
    list.forEach((item) => {
      if (location.pathname.includes(item.link.slice(1)))
        item.active = true;
    });
    setList(list);
  }, [props.list]);

  const navigation = useNavigate();


  const navigate = (item) => {
    list.forEach((l) => {
      if (l === item) l.active = true;
      else l.active = false;
    });
    navigation(item.link);
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
        {list.map((item, key) => {
          return (
            <SBListItem className={item.active ? 'active': null} key={key} onClick={() => navigate(item)} >
              <SBListItemBtn>
                <ListItemIcon sx={{minWidth: "40px"}}>
                  <MaterialIcon color={item.active && 'white'} icon={item.icon}></MaterialIcon>
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

export default ExpandedSidebar;
