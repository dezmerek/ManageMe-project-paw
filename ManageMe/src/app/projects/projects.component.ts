import { Component, OnInit } from '@angular/core';
import { Project } from '../models/project.model';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  showAddForm: boolean = false;

  ngOnInit() {
    this.projects = [
      {
        name: 'Projekt A',
        description: 'Mauris a ex hendrerit, bibendum lectus non, auctor neque. Fusce ut lorem ante. Morbi blandit purus gravida turpis dapibus rutrum.'
      },
      {
        name: 'Projekt B',
        description: 'Mauris a ex hendrerit, bibendum lectus non, auctor neque. Fusce ut lorem ante. Morbi blandit purus gravida turpis dapibus rutrum.'
      },
      {
        name: 'Projekt C',
        description: 'Mauris a ex hendrerit, bibendum lectus non, auctor neque. Fusce ut lorem ante. Morbi blandit purus gravida turpis dapibus rutrum.'
      }
    ];
  }

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
  }

  addProject(project: Project) {
    this.projects.push(project);
    this.saveProjectsToLocalStorage(this.projects);
    this.showAddForm = false;
  }

  private saveProjectsToLocalStorage(projects: Project[]) {
    localStorage.setItem('projects', JSON.stringify(projects));
  }

  workOnProject(project: Project) {
    console.log('Working on project:', project.name);
  }
}
