import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-functionality',
  templateUrl: './add-functionality.component.html',
  styleUrls: ['./add-functionality.component.scss']
})
export class AddFunctionalityComponent {
  @Output() functionalityAdded = new EventEmitter<any>();

  newFunctionality = {
    name: '',
    description: '',
    priority: '',
    project: '',
    owner: '',
    status: 'todo'
  };

  onSubmit() {
    this.functionalityAdded.emit(this.newFunctionality);
    this.resetForm();
  }

  resetForm() {
    this.newFunctionality = {
      name: '',
      description: '',
      priority: '',
      project: '',
      owner: '',
      status: 'todo'
    };
  }

  get showAddFunctionality() {
    return true;
  }
}
