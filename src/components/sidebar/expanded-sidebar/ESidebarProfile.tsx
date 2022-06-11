import { Logout } from "@mui/icons-material";
import { Avatar, Box, IconButton, styled } from "@mui/material";
import useAuth from "hooks/authentication/useAuth";
import FlexBox from "../../shared/FlexBox";

const SidebarProfileWrapper = styled(Box) ( {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
})


const ESidebarProfile = () => {

    const auth = useAuth();

    const logout = () => {
        auth.logout();
    }

    return (
        <SidebarProfileWrapper>
            <FlexBox sx={{columnGap: '5px', alignItems: 'center'}}>
                <Avatar src="assets/avatar-placeholder.jpeg"></Avatar>
                <Box sx={{whiteSpace: 'nowrap'}}>Kiss Mónika</Box>
            </FlexBox>
            <IconButton>
                <Logout onClick={logout}></Logout>
            </IconButton>
        </SidebarProfileWrapper>
    )
}

export default ESidebarProfile;