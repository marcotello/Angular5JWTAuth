import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { User } from '../_models/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerUserData: any = {};

  constructor(private _auth: AuthService) { }

  ngOnInit() {
  }

  register() {
    const user: User = {
      email: this.registerUserData.email,
      password: this.registerUserData.password
    };
    this._auth.register(user).subscribe(res => {
      console.log(res);
    }, error => {
      console.log(error);
    });
  }

}
