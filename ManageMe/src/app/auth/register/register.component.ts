import { Component, Output, EventEmitter, Inject } from '@angular/core';
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
  selectedRole: string = ''; // Dodaj pole wybranej roli
  roles: string[] = ['Admin', 'Devops', 'Developer']; // Lista dostępnych ról

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) { }

  register() {
    console.log('Rejestracja...');
    console.log('Login:', this.login);
    console.log('Hasło:', this.password);
    console.log('Imię:', this.firstName);
    console.log('Nazwisko:', this.lastName);
    console.log('Rola:', this.selectedRole);

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
      role: this.selectedRole // Zapisz wybraną rolę
    };

    accounts.push(newAccount);
    this.storage.set('accounts', accounts);
    console.log('Dodano nowe konto');

    // Przejdź do innej strony lub wykonaj inne działania

    // Emitowanie zdarzenia autoryzacji
    this.authEvent.emit(true);
  }


  setAuth() {
    this.authEvent.emit(false);
  }
}
