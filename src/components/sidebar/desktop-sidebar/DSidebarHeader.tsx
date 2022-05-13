import { Menu } from "@mui/icons-material";
import { Box, IconButton, styled } from "@mui/material";
import { useContext } from "react";
import { SidebarContext } from "../Sidebar";

const SidebarHeaderWrapper = styled(Box) ( {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
})

const AppLogo = styled('img') ( {
    width: '150px',
    objectFit: 'contain'
});


const DSidebarHeader = () => {

    const context = useContext(SidebarContext);

    return (
        <SidebarHeaderWrapper>
            <AppLogo src='assets/minped-logo-light.png'></AppLogo>
            <IconButton onClick={() => context.callback(true)}>
                    <Menu></Menu>
            </IconButton>
        </SidebarHeaderWrapper>
    )
}

export default DSidebarHeader;