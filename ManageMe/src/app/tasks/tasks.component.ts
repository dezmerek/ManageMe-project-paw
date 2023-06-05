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
    }
    this.saveTasksToLocalStorage();
  }

  getTasksByStatus(status: string) {
    return this.tasks.filter(task => task.status === status);
  }

  addTask(task: Task) {
    // Implement your logic to add the task to the tasks array
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
