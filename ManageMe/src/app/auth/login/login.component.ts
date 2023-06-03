import { Component, Output, EventEmitter, Inject } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @Output() authEvent = new EventEmitter<boolean>();

  login: string = '';
  password: string = '';
  invalidLogin: boolean = false;

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) { }

  setAuth() {
    // Przejdź do formularza rejestracji
    this.authEvent.emit(false);
  }

  loginUser() {
    // Logika logowania użytkownika
    console.log('Login:', this.login);
    console.log('Password:', this.password);
    console.log('Zalogowano!');

    // Sprawdź dane logowania z localStorage
    const account: any = this.storage.get('account');
    const accounts: any[] = this.storage.get('accounts') || [];
    const foundAccount = accounts.find((acc: any) => acc.login === this.login && acc.password === this.password);

    if (foundAccount || (account && account.login === this.login && account.password === this.password)) {
      // Użytkownik został zalogowany pomyślnie
      this.storage.set('loggedIn', true);
      this.authEvent.emit(true);
    } else {
      // Nieprawidłowe dane logowania
      this.invalidLogin = true;
      console.log('Nieprawidłowe dane logowania');
    }
  }

}
