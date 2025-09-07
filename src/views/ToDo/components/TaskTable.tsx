// import React from 'react'
// import type {FC} from 'react'
import dayjs from 'dayjs'
import{
    // TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    // Paper,
    Checkbox,
    // IconButton,
    // Typography,
    // Tooltip
} from '@mui/material'

import DeleteIcon from '@mui/icons-material/Delete'
// import EditIcaon from '@mui/icons-material/Edit'

import type { Task } from '@/types/task'

type TaskTableProps = {
    tasks: Task[],
    onDelete: (id: number)=> void
    onToggle: (id: number , data: Task) => void
}
export const TaskTable = ({tasks, onDelete, onToggle}: TaskTableProps) => {
    return(
        <Table>
            <TableHead>
                <TableRow>
                <TableCell>Название</TableCell>
                    <TableCell>Статус</TableCell>
                    <TableCell>Дата создания</TableCell>
                    <TableCell>Уведомление (time)</TableCell>
                    <TableCell>Группа(вид)</TableCell>
                    <TableCell>Важность</TableCell>
                    <TableCell>Действия</TableCell>

                </TableRow>
            </TableHead>
            <TableBody>
                {tasks.map(task => (
                    <TableRow key={task.id}>
                        <TableCell>
                            {task.title}
                        </TableCell>
                        <TableCell>
                            <Checkbox
                                checked={task.completed}
                                onChange={()=> onToggle(Number(task.id) , { ...task, completed: !task.completed })}
                            />
                        </TableCell>
           
               
                        <TableCell>
                            {dayjs(task.createdAt).format("DD.MM.YYYY,  HH:mm")}
                        </TableCell>
                        <TableCell>
                            {dayjs(task.notification).format("DD.MM.YYYY,  HH:mm")}
                        </TableCell>
                        <TableCell>
                            {task.categories}
                        </TableCell>
                        <TableCell>
                            {task.priority}
                        </TableCell>
                        <TableCell>
                            <DeleteIcon 
                                onClick={()=> onDelete(task.id)}
                                sx={{cursor: "pointer"}}
                            />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}