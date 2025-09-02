import{
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Checkbox,
    FormControlLabel
} from '@mui/material'

import { useForm , Controller} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'

import type { Task } from './types'

const schema = yup.object({
    title: yup.string().required('Введите название задачи'),
    completed: yup.boolean().default(false),
}).required();


type AddTaskModalProps = {
    open : boolean,
    onClose: ()=> void;
    onSubmit: (task: Omit<Task, 'id'>) => void
}


export const AddTaskModal = ({open, onClose, onSubmit}: AddTaskModalProps) =>{
    const {
        handleSubmit,
        control, 
        reset,
        formState: {errors}
    } =useForm<Omit<Task, 'id'>>({
        defaultValues: {title : '' , completed: false},
        resolver: yupResolver(schema)
    })

    const handleFormSubmit =(data: Omit<Task, 'id'>) =>{
        onSubmit(data)
        reset()
        onClose()

    }

    return(
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Добавить задачу</DialogTitle>
            <DialogContent>
                <Controller
                    name='title'
                    control={control}
                    render={({field, fieldState})=> (
                        <TextField
                            name={field.name}
                            value={field.value}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            inputRef={field.ref} // (в случае MUI)
                            label="Название" //этот вариант если не использовать spread он пробрасывает все пропсы которые есть сам а здесь вручную 
                            fullWidth
                            margin="dense"
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                        />
                    )}
                />

                <Controller
                    name="completed"
                    control={control}
                    render={({ field }) => (
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={field.value}
                                    onChange={e => field.onChange(e.target.checked)}
                                />
                            }
                            label="Статус"
                        />
                    )}
                />

            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color='secondary'>
                    Отмена
                </Button>
                <Button onClick={handleSubmit(handleFormSubmit)} variant='contained' color='primary'>
                    Добавить
                </Button>
            </DialogActions>
        </Dialog>
    )
}