import { createTheme } from '@mui/material/styles'
const commonTypography = {
    fontFamily: '"Roboto", "Arial"',
    h1:{
        fontSize: '2.5rem',
        fontWeight: 700,
        lineHeight: 1.2
    },
    h2: {
        fontSize: '2rem',
        fontWeight: 600,
        lineHeight: 1.3
    },
    h3:{
        fontSize: '1.75rem',
        fontWeight: 600,
        lineHeight: 1.3

    },
    h4: {
        fontSize: '1.5rem',  // ~24px
        fontWeight: 500,
        lineHeight: 1.3,
    },
    h5: {
    fontSize: '1.25rem', // ~20px
    fontWeight: 500,
    lineHeight: 1.4,
    },
    h6: {
    fontSize: '1rem',    // ~16px
    fontWeight: 500,
    lineHeight: 1.4,
    },
    body1:{
        fontSize: '1rem',
        lineHeight: 1.5
    },
    body2:{
        fontSize: '0.875rem',
        lineHeight: 1.4,
        color: '#4d4d4d'
    }
}
const commonShape  = {borderRadius : 8 }

export const getTheme  = (mode: 'dark'  | 'light' )=>{
    const palette = mode === 'light'
    ? {
        mode: 'light' as const,
        primary: {main: '#05cfff'},
        secondary: {main: '#ff6b6b'},
        error: {main: '#d32f2f'},
        warning: {main: '#ffa000'},
        background: {default: '#f9f9f9', paper:'#ffffff'},
        text: {primary: '#1a1a1a', secondary:'#4d4d4d'},
    }:
    {
        mode: 'dark' as const,
        primary: { main: '#90caf9' },
        secondary: { main: '#f48fb1' },
        error: { main: '#ef5350' },
        warning: { main: '#ffb74d' },
        background: { default: '#121212', paper: '#1e1e1e' },
        text: { primary: '#ffffff', secondary: '#b0b0b0' },
    }
    return createTheme({
        palette,
        typography: commonTypography,
        shape: commonShape,
        components: {
            MuiCssBaseline:{
                styleOverrides: {
                    body: {
                        height: '100vh',
                        width: '100vw',
                        backgroundImage:  "url('src/assets/background.jpg')",
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center center',
                    }
                }
            }


        }

    })
}
