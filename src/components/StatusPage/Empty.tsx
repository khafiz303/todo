import {Box , Typography} from '@mui/material'
import './styles.scss'

interface EmptyProps {
    addTasks : boolean;
    openModal : ()=> void
}
export const Empty = ({addTasks , openModal}: EmptyProps)=>{

    return(
        <Box className='box'>
            <Typography variant='h3' color='primary'>
                Нет данных
            </Typography>
            {addTasks && <Typography variant='h1' onClick={openModal}>
                Добавить задачи
            </Typography>}
        </Box>
        
    )

}