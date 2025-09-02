import {Box , Typography} from '@mui/material'
import './styles.scss'
export const Empty = ()=>{
    return(
        <Box className='box'>
            <Typography variant='h3' color='primary'>
                Нет данных
            </Typography>
        </Box>
    )

}