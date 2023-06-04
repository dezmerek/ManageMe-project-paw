import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  showAddTaskForm = false;
  tasks: Task[] = [];
  selectedTask: Task | null = null;

  ngOnInit() {
    // Load tasks from localStorage
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      this.tasks = JSON.parse(storedTasks);
    } else {
      this.addSampleTasks();
    }
  }

  addSampleTasks() {
    // Dodaj przykładowe zadanie do statusu "todo"
    const taskTodo: Task = {
      name: 'Przykładowe zadanie - Todo',
      status: 'todo',
      description: 'Opis przykładowego zadania - Todo',
      priority: 'High',
      functionality: {
        id: '1',
        name: 'Funkcjonalność 1',
        description: 'Opis funkcjonalności 1',
        priority: 'High',
        project: 'Projekt 1',
        owner: 'Właściciel 1',
        status: 'Status 1',
        tasks: []
      },
      estimatedTime: '2h',
      assignedUser: 'John Doe',
      showDetails: false
    };

    // Dodaj przykładowe zadanie do statusu "doing"
    const taskDoing: Task = {
      name: 'Przykładowe zadanie - Doing',
      status: 'doing',
      description: 'Opis przykładowego zadania - Doing',
      priority: 'Medium',
      functionality: {
        id: '2',
        name: 'Funkcjonalność 2',
        description: 'Opis funkcjonalności 2',
        priority: 'High',
        project: 'Projekt 1',
        owner: 'Właściciel 2',
        status: 'Status 2',
        tasks: []
      },
      estimatedTime: '4h',
      assignedUser: 'Jane Smith',
      showDetails: false
    };

    // Dodaj przykładowe zadanie do statusu "done"
    const taskDone: Task = {
      name: 'Przykładowe zadanie - Done',
      status: 'done',
      description: 'Opis przykładowego zadania - Done',
      priority: 'Low',
      functionality: {
        id: '3',
        name: 'Funkcjonalność 3',
        description: 'Opis funkcjonalności 3',
        priority: 'Medium',
        project: 'Projekt 2',
        owner: 'Właściciel 3',
        status: 'Status 3',
        tasks: []
      },
      estimatedTime: '1h',
      assignedUser: 'Robert Johnson',
      showDetails: false
    };

    this.tasks.push(taskTodo, taskDoing, taskDone);
    this.saveTasksToLocalStorage();
  }

  getTasksByStatus(status: string) {
    return this.tasks.filter(task => task.status === status);
  }

  toggleDetails(task: Task) {
    this.selectedTask = task;
  }

  moveTask(task: Task, newStatus: string) {
    task.status = newStatus;
    this.saveTasksToLocalStorage();
  }

  toggleAddTaskForm() {
    this.showAddTaskForm = !this.showAddTaskForm;
  }

  onTaskAdded(task: Task) {
    this.tasks.push(task);
    this.saveTasksToLocalStorage();
  }

  saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}
