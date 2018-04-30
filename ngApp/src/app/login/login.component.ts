import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { User } from '../_models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUserData: any = {};

  constructor(private _auth: AuthService, private _router: Router) { }

  ngOnInit() {
  }

  login() {
    const user: User = {
      email: this.loginUserData.email,
      password: this.loginUserData.password
    };
    this._auth.login(user).subscribe(res => {
      console.log(res);
      localStorage.setItem('token', res.token);
      this._router.navigate(['/special']);
    }, error => {
      console.log(error);
    });
  }
}
