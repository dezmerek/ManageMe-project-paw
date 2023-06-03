import { Component, OnInit, Inject } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ManageMe';

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) { }

  ngOnInit() {
    const accounts = [
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

    this.storage.set('accounts', accounts);
  }
}
