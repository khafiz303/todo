import React from 'react'
import  { Button , Box , Typography } from "@mui/material";
import './styles.scss'
interface ErrorProps{
    retry? : ()=> void
}
// export const ErrorPage = ({retry}: ErrorProps) = {} тоже варик 
export const Error: React.FC<ErrorProps> = ({retry}) => {
    return(
        <Box className='box'>
            <Typography variant='h3' color='error'>
                Произошла ошибка при загрузке
            </Typography>
            {retry && <Button variant='contained' onClick={()=> retry}>Попробовать снова</Button>}
        </Box>
    )

}