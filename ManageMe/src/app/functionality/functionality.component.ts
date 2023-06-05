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
    const projectId = localStorage.getItem('projectId');
    if (projectId) {
      const storedFunctionalities = localStorage.getItem(`functionalities_${projectId}`);
      if (storedFunctionalities) {
        this.functionalities = JSON.parse(storedFunctionalities);
      } else {
        this.functionalities = [];
        this.saveFunctionalities();
      }
    } else {
      console.log('Nie wybrano projektu. Nie można wczytać funkcjonalności.');
    }
  }

  saveFunctionalities() {
    const projectId = localStorage.getItem('projectId');
    if (projectId) {
      localStorage.setItem(`functionalities_${projectId}`, JSON.stringify(this.functionalities));
    } else {
      console.log('Nie wybrano projektu. Nie można zapisać funkcjonalności.');
    }
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
