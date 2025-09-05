// import React from 'react'
import { Box, CircularProgress , Typography } from '@mui/material'
import './styles.scss'
export const Loading = ()=>{
    return(
        <Box className='box'>
            <CircularProgress color='primary' size={60} thickness={10}/>
            <Typography>
                Загрузка данных...
            </Typography>

            <img src="../../assets/loading.svg" alt="asas" />
        </Box>
    )

}