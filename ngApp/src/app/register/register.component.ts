import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { User } from '../_models/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerUserData: any = {};

  constructor(private _auth: AuthService, private _router: Router) { }

  ngOnInit() {
  }

  register() {
    const user: User = {
      email: this.registerUserData.email,
      password: this.registerUserData.password
    };
    this._auth.register(user).subscribe(res => {
      console.log(res);
      localStorage.setItem('token', res.token);
      this._router.navigate(['/special']);
    }, error => {
      console.log(error);
    });
  }

}
