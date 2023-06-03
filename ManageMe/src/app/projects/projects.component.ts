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
  editMode: boolean = false;
  editedProjectIndex: number | null = null;

  editedProject: Project = {
    name: '',
    description: ''
  };

  isAdmin: boolean = false; // Flaga oznaczająca, czy użytkownik jest administratorem
  isDevOps: boolean = false; // Flaga oznaczająca, czy użytkownik jest devops

  ngOnInit() {
    this.loadProjectsFromLocalStorage();
    this.checkUserRole(); // Sprawdzanie roli użytkownika przy inicjalizacji komponentu
  }

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
    this.editMode = false; // W przypadku przełączenia na formularz dodawania, wyłączamy tryb edycji
    this.clearEditedProject();
  }

  addProject(project: Project) {
    this.projects.push(project);
    this.saveProjectsToLocalStorage();
    this.showAddForm = false;
  }

  deleteProject(index: number) {
    this.projects.splice(index, 1);
    this.saveProjectsToLocalStorage();
  }

  editProject(project: Project, index: number) {
    if (this.isAdmin || this.isDevOps) {
      this.editMode = true;
      this.editedProjectIndex = index;
      this.editedProject = { ...project }; // Tworzymy kopię projektu do edycji
      this.showAddForm = true;
    } else {
      // Użytkownik nie ma uprawnień do edycji
      console.log('Brak uprawnień do edycji projektu.');
    }
  }

  updateProject() {
    if (this.isAdmin || this.isDevOps) {
      if (this.editedProjectIndex !== null) {
        this.projects[this.editedProjectIndex] = { ...this.editedProject };
        this.saveProjectsToLocalStorage();
        this.showAddForm = false;
        this.clearEditedProject();
      }
    } else {
      // Użytkownik nie ma uprawnień do aktualizacji projektu
      console.log('Brak uprawnień do aktualizacji projektu.');
    }
  }

  private saveProjectsToLocalStorage() {
    localStorage.setItem('projects', JSON.stringify(this.projects));
  }

  private loadProjectsFromLocalStorage() {
    const savedProjects = localStorage.getItem('projects');
    if (savedProjects) {
      try {
        this.projects = JSON.parse(savedProjects);
        console.log('Wczytano projekty z localStorage:', this.projects);
      } catch (error) {
        console.error('Błąd parsowania danych projektów z localStorage:', error);
        this.projects = this.getDefaultProjects(); // Używamy domyślnych danych projektów
      }
    } else {
      this.projects = this.getDefaultProjects(); // Używamy domyślnych danych projektów
    }
  }

  private getDefaultProjects(): Project[] {
    return [
      {
        name: 'Projekt A',
        description:
          'Mauris a ex hendrerit, bibendum lectus non, auctor neque. Fusce ut lorem ante. Morbi blandit purus gravida turpis dapibus rutrum.'
      },
      {
        name: 'Projekt B',
        description:
          'Mauris a ex hendrerit, bibendum lectus non, auctor neque. Fusce ut lorem ante. Morbi blandit purus gravida turpis dapibus rutrum.'
      },
      {
        name: 'Projekt C',
        description:
          'Mauris a ex hendrerit, bibendum lectus non, auctor neque. Fusce ut lorem ante. Morbi blandit purus gravida turpis dapibus rutrum.'
      }
    ];
  }

  private clearEditedProject() {
    this.editedProjectIndex = null;
    this.editedProject = {
      name: '',
      description: ''
    };
  }

  workOnProject(project: Project) {
    console.log('Pracuję nad projektem:', project.name);
  }

  private checkUserRole() {
    const userRole = localStorage.getItem('userRole'); // Pobierz rolę użytkownika z localStorage

    if (userRole === 'admin') {
      this.isAdmin = true;
      this.isDevOps = true;
    } else if (userRole === 'devops') {
      this.isDevOps = true;
    }
  }
}