import React from 'react'
import type {FC} from 'react'
import{
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
    Checkbox,
    IconButton,
    Typography,
    Tooltip
} from '@mui/material'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcaon from '@mui/icons-material/Edit'

import type { Task } from './types'

type TaskTableProps = {
    tasks: Task[],
    onDelete: (id: number)=> void
    onToggle: (id: number , completed: boolean) => void
}
export const TaskTable = ({tasks, onDelete, onToggle}: TaskTableProps) => {
    return(
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Статус</TableCell>
                    <TableCell>Название</TableCell>
                    <TableCell>Действия</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {tasks.map(task => (
                    <TableRow key={task.id}>
                        <TableCell>
                            <Checkbox
                                checked={task.completed}
                                onChange={()=> onToggle(task.id , !task.completed)}
                            />
                        </TableCell>
                        <TableCell>
                            {task.title}
                        </TableCell>
                        <TableCell>
                            <DeleteIcon onClick={()=> onDelete(task.id)}/>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}