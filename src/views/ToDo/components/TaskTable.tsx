// import React from 'react'
// import type {FC} from 'react'
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
                    <TableCell>Статус</TableCell>
                    <TableCell>Название</TableCell>
                    <TableCell>Действия</TableCell>
                    <TableCell>Дата создания</TableCell>
                    <TableCell>Уведомление (time)</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {tasks.map(task => (
                    <TableRow key={task.id}>
                        <TableCell>
                            <Checkbox
                                checked={task.completed}
                                onChange={()=> onToggle(task.id , { ...task, completed: !task.completed })}
                            />
                        </TableCell>
                        <TableCell>
                            {task.title}
                        </TableCell>
                        <TableCell>
                            <DeleteIcon onClick={()=> onDelete(task.id)}/>
                        </TableCell>
                        <TableCell>
                            {task.createdAt.toLocaleString()}
                        </TableCell>
                        <TableCell>
                            {task.notification.toLocaleString()}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}