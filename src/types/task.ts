export interface Task {
    id: number ,
    title : string,
    completed : boolean
    createdAt: Date;
    notification: Date;
    priority: string
}   

export interface priorityType{
    priority: 'low' | 'high' | 'medium'
}