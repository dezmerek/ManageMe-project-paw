import { Component, Output, EventEmitter } from '@angular/core';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @Output() authEvent = new EventEmitter<boolean>();

  user: User = {
    login: '',
    password: '',
    firstName: '',
    lastName: '',
    role: 'developer'
  };

  invalidLogin: boolean = false;

  constructor(private router: Router) {
    this.user.role = 'developer'; // Ustaw domyślną wartość dla roli
  }

  setAuth() {
    // Przejdź do formularza rejestracji
    this.authEvent.emit(false);
  }

  loginUser() {
    // Logika logowania użytkownika
    console.log('Login:', this.user.login);
    console.log('Password:', this.user.password);
    console.log('Zalogowano!');

    // Sprawdź dane logowania
    const validUsersJSON = localStorage.getItem('validUsers');
    const validUsers: any[] = validUsersJSON ? JSON.parse(validUsersJSON) : [];

    const allUsers = [
      ...validUsers,
      { login: 'admin', password: 'admin', role: 'admin' },
      { login: 'devops', password: 'devops', role: 'devops' },
      { login: 'developer', password: 'developer', role: 'developer' }
    ];

    const foundUser = allUsers.find(
      (user) => user.login === this.user.login && user.password === this.user.password
    );

    if (foundUser) {
      // Użytkownik został zalogowany pomyślnie
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('userRole', foundUser.role);
      this.router.navigate(['/projects']);
      this.authEvent.emit(true); // Emitowanie zdarzenia autoryzacji
    } else {
      // Nieprawidłowe dane logowania
      this.invalidLogin = true;
      console.log('Nieprawidłowe dane logowania');
    }
  }

}
