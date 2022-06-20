import { Box, styled } from "@mui/material";
import React from "react";
import { useState } from "react";
import ExpandedSidebar from "./expanded-sidebar/ExpandedSidebar";
import CollapsedSidebar from "./collapsed-sidebar/CollapsedSidebar";

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
  link: string;
  active?: boolean;
}

export interface SidebarProps {
  list: SidebarListItem[];
  callback: CallableFunction;
}

export const SidebarContext = React.createContext<Partial<SidebarProps>>({});

const SideBar = () => {
  const list: SidebarListItem[] = [
    { label: "Tag", icon: "LocalOffer", link: '/tag' },
    { label: "Média", icon: "LocalOffer", link: '/media' },
    { label: "Termék", icon: "LocalOffer", link: '/product' },
    { label: "Tematikus tev.", icon: "LocalOffer", link: '/ability' },
    { label: "Fejlesztő játékok", icon: "LocalOffer", link: '/games' }
  ];

  const [active, setActive] = useState(false);

  const onActive = (status = false) => {
    setActive(status);
  };

  return (
    <SidebarContext.Provider value={{ list: list, callback: onActive }}>
      <SidebarWrapper className={active ? 'active' : null}>
        {!active ? (
            <ExpandedSidebar list={list} callback={onActive}></ExpandedSidebar>
        ) : (
            <CollapsedSidebar list={list} callback={onActive}></CollapsedSidebar>
        )}
      </SidebarWrapper>
    
    </SidebarContext.Provider>
  );
};

export default SideBar;