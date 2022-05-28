import React from "react"
import  * as Icons from "@mui/icons-material";


const MaterialIcon = ( {icon, color = null}) => {
    let iconName = icon.replace(/Icon$/, '')
    const DynamicIcon = Icons[iconName];
    return (
        <DynamicIcon sx={{color: color ? color: null}}></DynamicIcon>
    )
}

export default MaterialIcon;