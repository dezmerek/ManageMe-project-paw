import { Component, OnInit } from '@angular/core';
import { Functionality } from '../models/functionality.model';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-functionality',
  templateUrl: './functionality.component.html',
  styleUrls: ['./functionality.component.scss']
})
export class FunctionalityComponent implements OnInit {
  functionalities: Functionality[] = [];

  selectedFunctionality: Functionality | null = null;
  showAddFunctionality = false;

  newTaskName = '';
  newTaskPriority = '';

  ngOnInit() {
    this.loadFunctionalities();
  }

  loadFunctionalities() {
    const storedFunctionalities = localStorage.getItem('functionalities');
    if (storedFunctionalities) {
      this.functionalities = JSON.parse(storedFunctionalities);
    } else {
      this.functionalities = [
        // ... Your initial set of functionalities ...
      ];
      this.saveFunctionalities();
    }
  }

  saveFunctionalities() {
    localStorage.setItem('functionalities', JSON.stringify(this.functionalities));
  }

  selectFunctionality(functionality: Functionality) {
    this.selectedFunctionality = functionality;
  }

  addFunctionality(newFunctionality: Functionality) {
    this.functionalities.push(newFunctionality);
    this.saveFunctionalities();
    this.showAddFunctionality = false;
    this.selectedFunctionality = newFunctionality;
  }

  getFunctionalitiesByStatus(status: string) {
    return this.functionalities.filter(functionality => functionality.status === status);
  }

  pracuj(functionality: Functionality) {
    console.log('Pracuj clicked for:', functionality);
    // Perform the desired action specific to the functionality
  }

  moveFunctionality(functionality: Functionality, status: string) {
    functionality.status = status;
    this.saveFunctionalities();
  }

  selectTask(task: Task) {
    console.log('Selected task:', task);
    // Perform operations on the selected task
  }

  moveTask(task: Task, status: string) {
    task.status = status;
    if (status === 'doing') {
      task.startDate = new Date();
      task.assignedUser = 'devops';
    } else if (status === 'done') {
      task.endDate = new Date();
    }
    this.saveFunctionalities();
  }

  clearSelectedFunctionality() {
    this.selectedFunctionality = null;
  }

  addTask(newTask: Task) {
    if (this.selectedFunctionality) {
      newTask.functionality = this.selectedFunctionality;
      this.selectedFunctionality.tasks.push(newTask);
      this.saveFunctionalities();
    }
  }
}
