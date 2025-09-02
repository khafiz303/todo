import { useRoutes } from 'react-router-dom'
import { AppRoutes } from './router'
import { Navbar } from './components/Layout/Navbar'

// const AppComponent: React.FC<AppProps> = ({ toggleTheme }) => { старый мметод не рекомендуется юзать так как создает children даже если не используешь
export const App = () =>{
    return(
        <div>
            <Navbar/>
            <AppRoutes/>
        </div>
    )
}
