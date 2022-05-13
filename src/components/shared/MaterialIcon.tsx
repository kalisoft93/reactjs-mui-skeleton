import React from "react"
import  * as Icons from "@mui/icons-material";


const MaterialIcon = ({ icon }) => {
    let iconName = icon.replace(/Icon$/, '')
    const DynamicIcon = Icons[iconName];
    return (
        <DynamicIcon></DynamicIcon>
    )
}

export default MaterialIcon;