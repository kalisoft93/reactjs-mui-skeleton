import { ThemeProvider } from "@mui/material/styles";

import React, { FunctionComponent, ReactNode } from "react";
import theme from "./theme";

interface BaseLayoutProps {
  children?: ReactNode;
}

const MuiTheme: FunctionComponent<BaseLayoutProps> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      {/* <CssBaseline /> */}
      {children}
    </ThemeProvider>
  );
};

export default MuiTheme;
