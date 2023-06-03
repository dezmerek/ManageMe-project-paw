import { Component, Output, EventEmitter, Inject } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
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

  constructor(
    @Inject(LOCAL_STORAGE) private storage: StorageService,
    private router: Router
  ) {
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

    // Sprawdź dane logowania z localStorage
    const account: any = this.storage.get('account');
    const accounts: any[] = this.storage.get('accounts') || [];
    const foundAccount = accounts.find(
      (acc: any) =>
        acc.login === this.user.login && acc.password === this.user.password
    );

    if (
      foundAccount ||
      (account && account.login === this.user.login && account.password === this.user.password)
    ) {
      // Użytkownik został zalogowany pomyślnie
      this.storage.set('loggedIn', true);
      this.authEvent.emit(true);
      this.router.navigate(['/projects']);
    } else {
      // Nieprawidłowe dane logowania
      this.invalidLogin = true;
      console.log('Nieprawidłowe dane logowania');
    }
  }
}
