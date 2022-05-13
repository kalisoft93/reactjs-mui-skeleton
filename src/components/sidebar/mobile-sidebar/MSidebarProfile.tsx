import { Avatar,  styled } from "@mui/material";
import FlexBox from "../../shared/FlexBox";

const MSidebarHeaderWrapper = styled(FlexBox)({
    flexDirection: 'column',
    alignItems: 'center'
});

const MSidebarProfile = () => {

    return (
        <MSidebarHeaderWrapper>
            <Avatar src="assets/avatar-placeholder.jpeg"></Avatar>
        </MSidebarHeaderWrapper>
    )

};

export default MSidebarProfile;
