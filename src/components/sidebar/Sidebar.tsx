import { Box, styled } from "@mui/material";
import React from "react";
import { useState } from "react";
import DesktopSidebar from "./desktop-sidebar/DesktopSidebar";
import MobileSidebar from "./mobile-sidebar/MobileSIdebar";

const SidebarWrapper = styled(Box)({
  width: "250px",
  transition: ".2s ease-in-out",
  '&.active': {
    width: "80px"
  }
});

export interface SidebarListItem {
  label: string;
  icon: string;
}

export interface SidebarProps {
  list: SidebarListItem[];
  callback: CallableFunction;
}

export const SidebarContext = React.createContext<Partial<SidebarProps>>({});

const SideBar = () => {
  const list: SidebarListItem[] = [
    { label: "Menu 1", icon: "LocalOffer" },
    { label: "Menu 1", icon: "LocalOffer" },
  ];

  const [active, setActive] = useState(false);

  const onActive = (status = false) => {
    setActive(status);
  };

  return (
    <SidebarContext.Provider value={{ list: list, callback: onActive }}>
      <SidebarWrapper className={active ? 'active' : null}>
        {!active ? (
            <DesktopSidebar list={list} callback={onActive}></DesktopSidebar>
        ) : (
            <MobileSidebar list={list} callback={onActive}></MobileSidebar>
        )}
      </SidebarWrapper>
    
    </SidebarContext.Provider>
  );
};

export default SideBar;