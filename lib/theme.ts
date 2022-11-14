import { createTheme } from "@mui/material";

const appTheme = createTheme({
    palette: {
        mode: 'dark',
    },
    typography: {
        button: {
            textTransform: 'none'
        }
    }
})

export default appTheme;