import { Functionality } from './functionality.model';

export interface Task {
    name: string;
    description: string;
    startDate?: Date;
    endDate?: Date;
    assignedUser?: string;
    status: string;
    functionality: Functionality;
}
