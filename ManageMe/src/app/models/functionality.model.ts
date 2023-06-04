import { Task } from './task.model';

export interface Functionality {
    id: number;
    name: string;
    description: string;
    priority: string;
    project: string;
    owner: string;
    status: string;
    tasks: Task[];
}