import { Component, OnInit } from '@angular/core';
import { Project } from '../models/project.model';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];

  ngOnInit() {
    const project1: Project = {
      name: 'Projekt A',
      description: 'Mauris a ex hendrerit, bibendum lectus non, auctor neque. Fusce ut lorem ante. Morbi blandit purus gravida turpis dapibus rutrum.'
    };

    const project2: Project = {
      name: 'Projekt B',
      description: 'Mauris a ex hendrerit, bibendum lectus non, auctor neque. Fusce ut lorem ante. Morbi blandit purus gravida turpis dapibus rutrum.'
    };

    const project3: Project = {
      name: 'Projekt C',
      description: 'Mauris a ex hendrerit, bibendum lectus non, auctor neque. Fusce ut lorem ante. Morbi blandit purus gravida turpis dapibus rutrum.'
    };

    const project4: Project = {
      name: 'Projekt D',
      description: 'Mauris a ex hendrerit, bibendum lectus non, auctor neque. Fusce ut lorem ante. Morbi blandit purus gravida turpis dapibus rutrum.'
    };


    this.projects.push(project1, project2, project3, project4);
  }

  workOnProject(project: Project) {
    // Logic for working on the project
    console.log('Working on project:', project.name);
  }
}
