import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { TextField, Box, Button, Typography } from '@mui/material'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useForm , Controller } from 'react-hook-form'
import type { SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import type { User } from '@/types/user'
import { useCreateUserMutation } from '@/redux/services/userApi'

const schema = yup.object({
    login: yup.string().required(''),
    password: yup.string().required('').min(6),
    access_token: yup.string().required('')
})

export const Login = () => {
    const navigate = useNavigate()
    const [login, setLogin] = useState(true)
    const [createUser, {isLoading}] = useCreateUserMutation()
    const user = useAppSelector(state => state.auth.user)

    type LoginFormValues = yup.InferType<typeof schema>;

    const{
        handleSubmit,
        control,
        reset,
        formState: {errors}
    } = useForm<LoginFormValues>({
        defaultValues: {login:'a', password: 'a', access_token:'a'},
        resolver: yupResolver(schema)
    })

    const handleFormSubmit: SubmitHandler<Partial<User>> = async (data) => {
        await createUser(data)
        reset()

    }

    useAppDispatch()

    useEffect(() => {
        if(user?.access_token) {
            navigate('profile')
        }
    }, [user?.access_token])

    return(
        <Box>
            <Controller
                name='login'
                control={control}
                render = {({ field }) =>(
                    <TextField
                        type='text'
                        {...field}
                        label=''
                        fullWidth
                    />
                )}
                
            />
            {errors && <Typography variant='h5'>{errors.login?.message}</Typography>}

            <Controller
                name='password'
                control={control}
                render={({field}) => (
                    <TextField
                        type='text'
                        {...field}
                        label=''
                        fullWidth
                    />
                )}
                
            />
            {errors && <Typography variant='h5'>{errors.password?.message}</Typography>}

            <Button 
                onClick={handleSubmit(handleFormSubmit)} variant='contained' color='secondary'
                // loading={isLoading}
                disabled={isLoading}
            >
                Войти
            </Button>   // or LoadingButton

            {!login && (
                <Box>
                    <Controller
                        name='login'
                        control={control}
                        render={({field})=>(
                            <TextField
                                type='text'
                                {...field}
                                label=''
                                fullWidth
                            />
                        )}

                    />
                    {errors && <Typography variant='h5'>{errors.login?.message}</Typography>}

                    <Controller
                        name='password'
                        control={control}
                        render={({field}) => (
                            <TextField
                                type='text'
                                {...field}
                                label=''
                                fullWidth
                            />
                        )}
                    />

                    <Controller
                        name='password'
                        control={control}
                        render={({field}) => (
                            <TextField
                                type='text'
                                {...field}
                                label=''
                                fullWidth
                            />
                        )}
                    />

                    <Button onClick={() => setLogin(true)}>
                        send
                    </Button>

                </Box>
    
            )}
        </Box>
    )
}