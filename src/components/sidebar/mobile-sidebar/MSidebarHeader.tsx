import { Box, IconButton, styled } from "@mui/material";
import {Menu} from '@mui/icons-material';
import { useContext } from "react";
import { SidebarContext } from "../Sidebar";

const SidebarHeaderWrapper = styled(Box) ( {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
});

const AppLogo = styled('img') ( {
    width: '50px',
    objectFit: 'contain'
});


const MSidebarHeader = () => {

    const context = useContext(SidebarContext);
    
    return (
        <SidebarHeaderWrapper>
            <AppLogo src='assets/miniped-logo-mini-light.png'></AppLogo>
            <IconButton onClick={() => context.callback(false)}>
                    <Menu></Menu>
            </IconButton>
        </SidebarHeaderWrapper>
    )
}

export default MSidebarHeader;