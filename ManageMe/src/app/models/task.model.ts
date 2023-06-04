import { Functionality } from './functionality.model';

export interface Task {
    name: string;
    status: string;
    description: string;
    priority: string;
    functionality: {
        id: string;
        name: string;
        description: string;
        priority: string;
        project: string;
        owner: string;
        status: string;
        tasks: Task[];
    };
    estimatedTime: string;
    assignedUser: string;
    showDetails: boolean;
    startDate?: string; // Dodane pole startDate (opcjonalne)
    endDate?: string; // Dodane pole endDate (opcjonalne)
}
