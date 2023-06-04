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
    const accountsJSON = localStorage.getItem('accounts');
    const accounts: any[] = accountsJSON ? JSON.parse(accountsJSON) : [];

    this.users = accounts.map(account => ({
      id: account.id,
      login: account.login,
      firstName: account.firstName,
      lastName: account.lastName,
      role: account.role,
      password: account.password
    }));
  }
}  