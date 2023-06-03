import { Component, OnInit, Inject } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ManageMe';
  loggedIn: boolean = false; // Dodaj tę właściwość
  onAuthEvent(loggedIn: boolean) {
    this.loggedIn = loggedIn;
  }
  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) { }

  ngOnInit() {
    const accountList = [
      {
        login: 'admin',
        password: 'admin',
        firstName: 'John',
        lastName: 'Doe',
        role: 'Admin'
      },
      {
        login: 'devops',
        password: 'devops',
        firstName: 'Jane',
        lastName: 'Smith',
        role: 'DevOps'
      },
      {
        login: 'developer',
        password: 'developer',
        firstName: 'Michael',
        lastName: 'Johnson',
        role: 'Developer'
      }
    ];

    // Sprawdź, czy dane już istnieją w localStorage
    const localStorageAccounts: any[] = this.storage.get('accounts') || [];

    // Jeśli dane jeszcze nie istnieją, zapisz je do localStorage
    if (localStorageAccounts.length === 0) {
      this.storage.set('accounts', accountList);
    }
  }
}
