import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../_models/User';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  baseUrl = environment.apiUrl;
  registerURL = this.baseUrl + '/register';
  loginURL = this.baseUrl + '/login';

  constructor(private http: HttpClient, private _router: Router) { }

  register(user: User) {
    return this.http.post<any>(this.registerURL, user);
  }

  login(user: User) {
    return this.http.post<any>(this.loginURL, user);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this._router.navigate(['/events']);
  }
}
