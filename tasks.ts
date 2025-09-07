type Task = { title: string; completed: boolean; dueDate?: string; priority: 'low' | 'medium' | 'high' };
type User = { name: string; tasks: Task[] };

const users: User[] = [
  { name: 'Alice', tasks: [{ title: 'Task 1', completed: false, dueDate: '2025-09-08', priority: 'high' }] },
  { name: 'Bob', tasks: [{ title: 'Task 2', completed: true, priority: 'low' }] },
  { name: 'Charlie', tasks: [{ title: 'Task 3', completed: false, dueDate: '2025-09-07', priority: 'medium' }] },
];

const userF: User[] = users.filter(user => user.tasks.some(task=> 
    task.completed === false && (task.priority === 'high' || task.priority === 'medium') ))


const sortedUsers: User[] = userF.sort((a, b) => {
    const dateA = a.tasks[0]?.dueDate ? new Date(a.tasks[0].dueDate).getTime() : Infinity;
    const dateB = b.tasks[0]?.dueDate ? new Date(b.tasks[0].dueDate).getTime() : Infinity;
    return dateA - dateB; // по возрастанию
});
