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
  showAddTask: boolean = false;

  selectedFunctionality: Functionality | null = null;
  showAddFunctionality = false;
  tasks: Task[] = [];

  ngOnInit() {
    this.loadFunctionalities();
  }

  loadFunctionalities() {
    const projectId = localStorage.getItem('projectId');
    if (projectId) {
      const storedFunctionalities = localStorage.getItem(`functionalities_${projectId}`);
      if (storedFunctionalities) {
        this.functionalities = JSON.parse(storedFunctionalities);

        // Load tasks for each functionality
        this.functionalities.forEach((functionality) => {
          functionality.tasks = this.getTasksByFunctionality(functionality);
        });
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
    newFunctionality.tasks = [];
    this.functionalities.push(newFunctionality);
    this.saveFunctionalities();
    this.showAddFunctionality = false;
    this.selectedFunctionality = newFunctionality;
  }

  getFunctionalitiesByStatus(status: string) {
    return this.functionalities.filter(functionality => functionality.status === status);
  }

  getTasksByFunctionality(functionality: Functionality): Task[] {
    return this.tasks.filter(task => task.functionality === functionality);
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
      if (!this.selectedFunctionality.tasks) {
        this.selectedFunctionality.tasks = []; // Inicjalizuj tablicę zadań, jeśli nie istnieje
      }

      newTask.functionality = {
        id: this.selectedFunctionality.id,
        name: this.selectedFunctionality.name,
        description: this.selectedFunctionality.description,
        priority: this.selectedFunctionality.priority,
        project: this.selectedFunctionality.project,
        owner: this.selectedFunctionality.owner,
        status: this.selectedFunctionality.status,
        tasks: [] // Dodaj właściwość tasks tutaj
      };

      this.selectedFunctionality.tasks.push(newTask);
      this.tasks = this.getTasksByFunctionality(this.selectedFunctionality); // Pobierz zaktualizowaną listę zadań

      this.saveFunctionalities();
      this.selectedFunctionality = { ...this.selectedFunctionality }; // Zaktualizuj referencję wybranej funkcjonalności, aby wywołać detekcję zmian

      this.showAddTask = false; // Ukryj formularz po dodaniu zadania
    }
  }


}
