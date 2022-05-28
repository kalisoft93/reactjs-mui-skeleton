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
      },
      success: {
        main: '#3d8b40'
      }
    },
    typography: {
        button: {
          textTransform: 'none'
        },
        subtitle1: {
          fontSize: '1.05rem',
          fontWeight: '400'
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