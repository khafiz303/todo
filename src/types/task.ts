export interface Task {
    id: number ,
    title : string,
    completed : boolean,
    createdAt: Date;
    notification: Date;
    priority: string;
    categories: string
}   

export interface priorityType{
    priority: 'low' | 'high' | 'medium'
}