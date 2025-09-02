import { Box , Typography , Button} from '@mui/material'
import { useNavigate } from 'react-router'
import './styles.scss'
export const NotFound = ()=>{
    const navigate = useNavigate()

    return(
        <Box className='box'>
            <Typography>
                Ничего не найдено
            </Typography>
            <Button onClick={()=> navigate('/')}>
                На главную
            </Button>
        </Box>
    )
}