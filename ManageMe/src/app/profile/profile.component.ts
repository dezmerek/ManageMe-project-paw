import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  securityQuestion: string = '';
  securityAnswer: string = '';

  loggedInUser: User | undefined;
  passwordChanged: boolean = false;
  securityAnswerCorrect: boolean = true;

  constructor(private router: Router) {
    // Pobierz informacje o zalogowanym użytkowniku
    this.loggedInUser = this.getLoggedInUser();

    if (!this.loggedInUser) {
      // Przekieruj użytkownika na stronę logowania lub wykonaj inne odpowiednie działania
      this.router.navigate(['/login']);
    }
  }

  getLoggedInUser(): User | undefined {
    const accountsJSON = localStorage.getItem('accounts');
    const accounts: User[] = accountsJSON ? JSON.parse(accountsJSON) : [];

    const loggedInUserId = localStorage.getItem('loggedInUserId');
    const loggedInUser = accounts.find((user: User) => user.id === loggedInUserId);

    return loggedInUser ? loggedInUser : undefined;
  }

  isSecurityAnswerValid(): boolean {
    return (
      this.securityAnswer.toLowerCase() ===
      this.loggedInUser?.securityAnswer.toLowerCase()
    );
  }

  validateSecurityAnswer() {
    this.securityAnswerCorrect = this.isSecurityAnswerValid();
  }

  updateUserInLocalStorage(user: User) {
    const accountsJSON = localStorage.getItem('accounts');
    const accounts = accountsJSON ? JSON.parse(accountsJSON) : [];

    const updatedAccounts = accounts.map((account: User) => {
      if (account.id === user.id) {
        return user;
      } else {
        return account;
      }
    });

    localStorage.setItem('accounts', JSON.stringify(updatedAccounts));
  }

  changePassword() {
    this.validateSecurityAnswer();

    if (!this.securityAnswerCorrect) {
      console.log('Podana odpowiedź na pytanie pomocnicze jest niepoprawna');
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      console.log('Nowe hasło i potwierdzenie hasła nie pasują do siebie');
      return;
    }

    if (this.loggedInUser) {
      this.loggedInUser.password = this.newPassword;
      this.updateUserInLocalStorage(this.loggedInUser);
      this.passwordChanged = true;
    }
  }
}
