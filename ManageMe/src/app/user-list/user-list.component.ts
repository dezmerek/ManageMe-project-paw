import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor() { }

  ngOnInit() {
    this.getUsersFromLocalStorage();
  }

  getUsersFromLocalStorage() {
    const validUsersJSON = localStorage.getItem('validUsers');
    const validUsers: User[] = validUsersJSON ? JSON.parse(validUsersJSON) : [];

    const accountsJSON = localStorage.getItem('accounts');
    const accounts: any[] = accountsJSON ? JSON.parse(accountsJSON) : [];

    this.users = [...validUsers, ...accounts];
  }
}
