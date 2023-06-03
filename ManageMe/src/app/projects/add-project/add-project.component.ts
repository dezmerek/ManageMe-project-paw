import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent {
  @Output() projectAdded = new EventEmitter<{ name: string, description: string }>();

  name: string = '';
  description: string = '';

  addProject() {
    if (this.name.trim() !== '' && this.description.trim() !== '') {
      this.projectAdded.emit({ name: this.name, description: this.description });
      this.name = '';
      this.description = '';
    }
  }
}
