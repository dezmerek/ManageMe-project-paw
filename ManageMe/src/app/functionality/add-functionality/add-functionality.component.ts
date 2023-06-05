import { Component, EventEmitter, Output } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-add-functionality',
  templateUrl: './add-functionality.component.html',
  styleUrls: ['./add-functionality.component.scss']
})
export class AddFunctionalityComponent {
  @Output() functionalityAdded = new EventEmitter<any>();

  newFunctionality = {
    id: '',
    name: '',
    description: '',
    priority: '',
    projectId: '', // Zmienione pole na "projectId"
    owner: '',
    status: 'todo'
  };

  constructor() {
    this.loadProjectIdFromLocalStorage(); // Dodajemy wywołanie funkcji odczytującej projectId z local storage przy tworzeniu komponentu
  }

  loadProjectIdFromLocalStorage() {
    const projectId = localStorage.getItem('projectId');
    if (projectId) {
      this.newFunctionality.projectId = projectId;
    }
  }

  onSubmit() {
    this.newFunctionality.id = uuidv4(); // Generowanie unikalnego ID
    this.functionalityAdded.emit(this.newFunctionality);
    this.resetForm();
  }

  resetForm() {
    this.newFunctionality = {
      id: '',
      name: '',
      description: '',
      priority: '',
      projectId: '', // Zmienione pole na "projectId"
      owner: '',
      status: 'todo'
    };
  }

  get showAddFunctionality() {
    return true;
  }
}
