import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
      background: {
        paper: '#fff',
      },
      primary: {
        main: '#ea2c6d'
      },
      secondary: {
        main:  '#46505A'
      },
      action: {
        active: '#001E3C',
      }
      
    },
    typography: {
        button: {
          textTransform: 'none'
        }
      },
    components: {
        MuiSvgIcon: {
            styleOverrides: {
                root: {
                    color: '#495057'
                }
            }
        }
    }
  }
  );

export default theme;