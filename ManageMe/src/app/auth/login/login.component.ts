import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @Input() auth: boolean = false;
  @Output() authEvent = new EventEmitter<boolean>();

  setAuth() {
    this.authEvent.emit(this.auth);
  }
}
