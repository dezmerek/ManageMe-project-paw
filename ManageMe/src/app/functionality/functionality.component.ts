import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-functionality',
  templateUrl: './functionality.component.html',
  styleUrls: ['./functionality.component.scss']
})
export class FunctionalityComponent implements OnInit {
  functionalities: any[] = [];

  selectedFunctionality: any;
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
          name: 'Funkcjonalność 1',
          description: 'Opis funkcjonalności 1',
          priority: 'Wysoki',
          project: 'Projekt A',
          owner: 'Jan Kowalski',
          status: 'doing'
        },
        {
          name: 'Funkcjonalność 2',
          description: 'Opis funkcjonalności 2',
          priority: 'Średni',
          project: 'Projekt B',
          owner: 'Anna Nowak',
          status: 'todo'
        },
        {
          name: 'Funkcjonalność 3',
          description: 'Opis funkcjonalności 3',
          priority: 'Niski',
          project: 'Projekt C',
          owner: 'Adam Nowicki',
          status: 'done'
        }
      ];
      this.saveFunctionalities();
    }
  }

  saveFunctionalities() {
    localStorage.setItem('functionalities', JSON.stringify(this.functionalities));
  }

  selectFunctionality(functionality: any) {
    this.selectedFunctionality = functionality;
  }

  addFunctionality(newFunctionality: any) {
    this.functionalities.push(newFunctionality);
    this.saveFunctionalities();
    this.showAddFunctionality = false;
    this.selectedFunctionality = newFunctionality;
  }

  getFunctionalitiesByStatus(status: string) {
    return this.functionalities.filter(functionality => functionality.status === status);
  }

  pracuj(functionality: any) {
    // Handle the "Pracuj" button click event for the functionality item
    console.log('Pracuj clicked for:', functionality);
    // Perform the desired functionality-specific action here
    // For example, you can update the status of the functionality or perform some other operation.
  }

  moveFunctionality(functionality: any, status: string) {
    functionality.status = status;
    this.saveFunctionalities();
  }
}
