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

  ngOnInit() {
    this.loadFunctionalities();
  }

  loadFunctionalities() {
    const storedFunctionalities = localStorage.getItem('functionalities');
    if (storedFunctionalities) {
      this.functionalities = JSON.parse(storedFunctionalities);
    } else {
      this.functionalities = [
        {
          id: '1',
          name: 'Functionality 1',
          description: 'Sample functionality description',
          priority: 'high',
          project: '1',
          owner: 'John Doe',
          status: 'todo',
          tasks: []
        },
        {
          id: '2',
          name: 'Functionality 2',
          description: 'Sample functionality description',
          priority: 'medium',
          project: '2',
          owner: 'Jane Smith',
          status: 'doing',
          tasks: []
        }
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
