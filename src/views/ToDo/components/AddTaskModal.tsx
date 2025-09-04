import{
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Checkbox,
    MenuItem,
    FormControlLabel
} from '@mui/material'

import { useForm , Controller } from 'react-hook-form'
import type { SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'

import type { Task } from '@/types/task'

const schema = yup.object({
    title: yup.string().required('Введите название задачи'),
    completed: yup.boolean().default(false),
    createdAt: yup.date().default(()=> new Date()),
    notification: yup.date().required('Указите дату выполнение'),
    priority: yup.string().oneOf(['high' , 'medium' ,  'low']).required('Введите важность задачи'),
    categories: yup.string().oneOf(['general' , 'job' , 'edu' , 'personal']).required('Категория')
}).required();


type AddTaskModalProps = {
    onClose: () => void
    open : boolean,
    onSubmit: (task: Omit<Task, 'id'>) => void
}


export const AddTaskModal = ({open, onClose, onSubmit}: AddTaskModalProps) =>{
    const {
        handleSubmit,
        control, 
        reset,
        // formState: {errors}
    } =useForm<Omit<Task, 'id'>>({
        defaultValues: {title : '' , completed: false , createdAt: new Date(), notification: new Date(), categories: 'general' , priority : 'low'},
        resolver: yupResolver(schema)
    })

    const handleFormSubmit: SubmitHandler<Omit<Task, 'id'>> = (data) =>{
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

                <Controller
                    name='notification'
                    control={control}
                    render={({ field }) => (
                        <TextField
                            type='datetime-local'
                            {...field}
                            label="Уведомления и окончания"
                            fullWidth
                            margin="dense"
                            InputLabelProps={{
                                shrink: true
                            }}

                        />

                    )}
                />

                <Controller
                    name='priority'
                    control={control}
                    render={({field}) => (
                        <TextField
                            {...field}
                            select
                            label='Приоритет'
                            fullWidth
                            margin='dense'
                        >
                            <MenuItem value="low">Низкий</MenuItem>
                            <MenuItem value="medium">Средний</MenuItem>
                            <MenuItem value="high">Высокий</MenuItem>
                        </TextField>
                    )}
                />
                <Controller
                    name='categories'
                    control={control}
                    render={({field}) => (
                        <TextField
                            {...field}
                            label='Вид'
                            select
                            fullWidth
                            margin='dense'
                        >
                            <MenuItem value='general'>Общий</MenuItem>
                            <MenuItem value='personal'>Личный</MenuItem>
                            <MenuItem value='job' >Работа</MenuItem>
                            <MenuItem value='edu' >Оброзование(Саморазвитие)</MenuItem>
                        </TextField>
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