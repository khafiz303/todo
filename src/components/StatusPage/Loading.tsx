// import React from 'react'
import { Box, CircularProgress , Typography } from '@mui/material'
import './styles.scss'
export const Loading = ()=>{
    return(
        <Box className='box'>
            <CircularProgress color='primary' size={6} thickness={4}/>
            <Typography>
                Загрузка данных...
            </Typography>
        </Box>
    )

}