// import React from 'react'
import { Skeleton } from '@mui/material'
import { Box, CircularProgress , Typography } from '@mui/material'
import './styles.scss'
export const Loading = ()=>{
    return(
        <Box className='box'>
            <CircularProgress color='primary' size={6} thickness={4}/>
            <Typography>
                Загрузка данных...
            </Typography>
            <Skeleton variant="rounded" width="100%" animation="wave"/>
            <Box>
                <img src='@/assets/loading.svg'/>
            </Box>
        </Box>
    )

}