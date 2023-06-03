import { Component, Output, EventEmitter, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  @Output() authEvent = new EventEmitter<boolean>();

  login: string = '';
  password: string = '';
  firstName: string = '';
  lastName: string = '';
  roles: string[] = ['Admin', 'Devops', 'Developer']; // Lista dostępnych ról

  constructor(
    private router: Router,
    @Inject(LOCAL_STORAGE) private storage: StorageService
  ) { }

  register() {
    console.log('Rejestracja...');
    console.log('Login:', this.login);
    console.log('Hasło:', this.password);
    console.log('Imię:', this.firstName);
    console.log('Nazwisko:', this.lastName);

    // Sprawdź, czy konto o podanym loginie już istnieje w localStorage
    const accounts: any[] = this.storage.get('accounts') || [];
    const foundAccount = accounts.find((account: any) => account.login === this.login);

    if (foundAccount) {
      console.log('Konto o podanym loginie już istnieje');
      return;
    }

    // Dodaj nowe konto do localStorage
    const newAccount = {
      login: this.login,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName,
      role: 'developer' // Ustaw rolę na "Developer"
    };

    accounts.push(newAccount);
    this.storage.set('accounts', accounts);
    console.log('Dodano nowe konto');

    // Dodaj nowego użytkownika do listy `validUsers`
    const validUsersJSON = localStorage.getItem('validUsers');
    const validUsers: any[] = validUsersJSON ? JSON.parse(validUsersJSON) : [];
    validUsers.push({ login: newAccount.login, password: newAccount.password, role: newAccount.role });
    localStorage.setItem('validUsers', JSON.stringify(validUsers));
    console.log('Dodano nowego użytkownika do listy validUsers');

    // Logika logowania użytkownika po rejestracji
    console.log('Login:', newAccount.login);
    console.log('Password:', newAccount.password);
    console.log('Zalogowano!');

    // Sprawdź dane logowania
    const foundUser = validUsers.find(
      (user) => user.login === newAccount.login && user.password === newAccount.password
    );

    if (foundUser) {
      // Użytkownik został zalogowany pomyślnie
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('userRole', foundUser.role);
      this.router.navigate(['/projects']);
      this.authEvent.emit(true); // Emitowanie zdarzenia autoryzacji
    } else {
      // Nieprawidłowe dane logowania
      console.log('Nieprawidłowe dane logowania');
    }
  }

  setAuth() {
    this.authEvent.emit(false);
  }
}
