import { Component } from '@angular/core';
import { AuthService } from './_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private _authService: AuthService) {}

  logout() {
    this._authService.logout();
  }

  isLoggedIn() {
    return this._authService.loggedIn();
  }
}
