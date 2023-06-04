import { Component, Output, EventEmitter } from '@angular/core';
import { Task } from '../../models/task.model';
import { Functionality } from '../../models/functionality.model';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent {
  @Output() taskAdded: EventEmitter<Task> = new EventEmitter<Task>();

  newTaskName = '';
  newTaskDescription = '';
  newTaskPriority = '';
  newTaskFunctionality = '';
  newTaskEstimatedTime = '';
  newTaskStatus = 'todo'; // Ustawienie początkowego stanu na 'todo'
  newTaskStartDate: Date | undefined;
  newTaskEndDate: Date | undefined;
  newTaskAssignedUser = '';

  addTask() {
    const newTask: Task = {
      name: this.newTaskName,
      description: this.newTaskDescription,
      priority: this.newTaskPriority,
      functionality: {
        id: 1, // Set a default value for the id
        name: this.newTaskFunctionality,
        description: '',
        priority: '',
        project: '',
        owner: '',
        status: '',
        tasks: []
      },
      estimatedTime: this.newTaskEstimatedTime,
      status: this.newTaskStatus,
      startDate: this.newTaskStartDate,
      endDate: this.newTaskEndDate,
      assignedUser: this.newTaskAssignedUser
    };

    this.taskAdded.emit(newTask);
    this.resetForm();
  }


  private resetForm() {
    this.newTaskName = '';
    this.newTaskDescription = '';
    this.newTaskPriority = '';
    this.newTaskFunctionality = '';
    this.newTaskEstimatedTime = '';
    this.newTaskStatus = 'todo';
    this.newTaskStartDate = undefined;
    this.newTaskEndDate = undefined;
    this.newTaskAssignedUser = '';
  }
}
