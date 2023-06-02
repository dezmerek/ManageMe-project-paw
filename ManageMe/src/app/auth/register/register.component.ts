import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  @Input() auth: boolean = false;
  @Output() authEvent = new EventEmitter<boolean>(); // Declare the 'authEvent' property

  setAuth() {
    this.authEvent.emit(this.auth); // Emit the 'auth' value
  }
}
