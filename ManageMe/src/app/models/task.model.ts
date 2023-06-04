import { Functionality } from './functionality.model';

export interface Task {
    name: string;
    description: string;
    priority: string; // Upewnij się, że pole 'priority' jest obecne
    functionality: Functionality;
    estimatedTime: string;
    status: string;
    startDate?: Date;
    endDate?: Date;
    assignedUser: string;
}
