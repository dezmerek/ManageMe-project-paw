import { Component, Output, EventEmitter, Inject } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  @Output() authEvent = new EventEmitter<boolean>();

  email: string = '';
  password: string = '';
  firstName: string = '';
  lastName: string = '';

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) { }

  register() {
    console.log('Rejestracja...');
    console.log('Email:', this.email);
    console.log('Hasło:', this.password);
    console.log('Imię:', this.firstName);
    console.log('Nazwisko:', this.lastName);

    // Zapisz dane konta w localStorage
    const account = {
      email: this.email,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName
    };
    this.storage.set('account', account);

    // Przejdź do innej strony lub wykonaj inne działania

    // Emitowanie zdarzenia autoryzacji
    this.authEvent.emit(true);
  }

  switchToLogin() {
    this.authEvent.emit(false);
  }
}