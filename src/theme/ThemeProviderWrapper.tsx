import { ThemeProvider , CssBaseline } from '@mui/material'
import { getTheme } from '@/theme/index'
import {useState , useCallback, useContext, createContext , useMemo} from 'react'

type ThemeMode = 'light' | 'dark'
interface ThemeContextType {
    mode: ThemeMode;
    toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useThemeContext = ()=>{
    const context = useContext(ThemeContext)
    if(!context) throw new Error('useThemeContext must be used within ThemeProviderWrapper')
        return context
}

// export const ThemeProviderWrapper: React.FC<{children: React.ReactNode}> = ({children}) =>{
export const ThemeProviderWrapper = ({children}: {children: React.ReactNode}) => {
    const [isDarkMode, setIsDarkMode] = useState(false)

    const toggleTheme =useCallback(()=> {setIsDarkMode((prev) => !prev )}, [])
    const mode: ThemeMode = isDarkMode ? 'dark' : 'light'

    const  theme =useMemo(()=> getTheme(mode) , [mode])

    return(
            <ThemeContext.Provider value={{ mode, toggleTheme }}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    {children}
                </ThemeProvider>
            </ThemeContext.Provider>

    )
}