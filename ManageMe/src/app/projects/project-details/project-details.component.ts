import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {
  projectId: string = '';
  project: Project | undefined;
  showEditSection: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.projectId = params['id'];
      console.log('Wczytano szczegóły projektu o ID:', this.projectId);
      this.loadProjectDetails();
    });
  }

  private loadProjectDetails() {
    const projects: Project[] = JSON.parse(localStorage.getItem('projects') || '[]');
    const project = JSON.parse(JSON.stringify(projects.find(p => p.id === this.projectId)));
    if (project) {
      this.project = project;
    }
  }

  editProject() {
    this.showEditSection = true;
  }

  updateProject(updatedProject: Project) {
    const projects: Project[] = JSON.parse(localStorage.getItem('projects') || '[]');
    const projectIndex = projects.findIndex(p => p.id === this.projectId);
    if (projectIndex !== -1) {
      projects[projectIndex] = updatedProject;
      localStorage.setItem('projects', JSON.stringify(projects));
      this.showEditSection = false;
    }
  }
}
