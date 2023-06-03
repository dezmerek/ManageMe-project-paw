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
      const project = { name: this.name, description: this.description };
      this.projectAdded.emit(project);
      this.saveProjectToLocalStorage(project);
      this.name = '';
      this.description = '';
    }
  }

  private saveProjectToLocalStorage(project: { name: string, description: string }) {
    const existingProjects = JSON.parse(localStorage.getItem('projects') || '[]');
    existingProjects.push(project);
    localStorage.setItem('projects', JSON.stringify(existingProjects));
  }
}
