    export interface Task {
    id: number ,
    title : string,
    completed : boolean
    createdAt: Date;
    notification: Date;
    priority: Important;
    categories:Categories
    }   

    export type Important =  'low' | 'high' | 'medium'
    export type Categories = 'job' | 'edu' | 'personal' | 'general'
