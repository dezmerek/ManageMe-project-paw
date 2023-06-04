import { Component } from '@angular/core';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent {
  showAddTaskForm = false;
  tasks: Task[] = [
    {
      name: 'Przykładowe zadanie 1',
      status: 'todo',
      description: 'Opis zadania 1',
      priority: 'High',
      functionality: {
        id: 1,
        name: 'Funkcjonalność 1',
        description: 'Opis funkcjonalności 1',
        priority: 'High',
        project: 'Projekt 1',
        owner: 'Właściciel 1',
        status: 'Status 1',
        tasks: []
      },
      estimatedTime: '2h',
      assignedUser: 'John Doe'
    },
    {
      name: 'Przykładowe zadanie 2',
      status: 'doing',
      description: 'Opis zadania 2',
      priority: 'Medium',
      functionality: {
        id: 2,
        name: 'Funkcjonalność 2',
        description: 'Opis funkcjonalności 2',
        priority: 'Medium',
        project: 'Projekt 2',
        owner: 'Właściciel 2',
        status: 'Status 2',
        tasks: []
      },
      estimatedTime: '4h',
      assignedUser: 'Jane Smith'
    },
    {
      name: 'Przykładowe zadanie 3',
      status: 'done',
      description: 'Opis zadania 3',
      priority: 'Low',
      functionality: {
        id: 3,
        name: 'Funkcjonalność 3',
        description: 'Opis funkcjonalności 3',
        priority: 'Low',
        project: 'Projekt 3',
        owner: 'Właściciel 3',
        status: 'Status 3',
        tasks: []
      },
      estimatedTime: '1h',
      assignedUser: 'David Johnson'
    }
  ];

  toggleAddTaskForm() {
    this.showAddTaskForm = !this.showAddTaskForm;
  }

  addTask(task: Task) {
    this.tasks.push(task);
  }

  getTasksByStatus(status: string): Task[] {
    return this.tasks.filter(task => task.status === status);
  }

  moveTask(task: Task, newStatus: string) {
    task.status = newStatus;
  }
}
