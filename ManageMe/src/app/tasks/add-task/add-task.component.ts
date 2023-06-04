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
  newTaskPriority = '';

  addTask() {
    const newTask: Task = {
      name: this.newTaskName,
      description: '',
      status: 'todo',
      startDate: undefined,
      endDate: undefined,
      assignedUser: undefined,
      functionality: {
        name: '',
        description: '',
        priority: '',
        project: '',
        owner: '',
        status: '',
        tasks: []
      }
    };

    this.taskAdded.emit(newTask);
    this.newTaskName = '';
    this.newTaskPriority = '';
  }
}
