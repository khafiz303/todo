import { Box , Typography , Button} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import '@/components/StatusPage/styles.scss'
export const NotFoundPage = ()=>{
    const navigate = useNavigate()

    return(
        <Box className='box'>
            <Typography>
                Страница не найдена
            </Typography>
            <Button onClick={()=> navigate('/')}>
                На главную
            </Button>
        </Box>
    )
}