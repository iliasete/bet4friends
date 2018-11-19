import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

  loginGroup: FormGroup = this.formBuilder.group({
    email: [''],
    password: ['']
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth$: AuthService,
    private users$: UsersService
  ) { }

  login() {
    this.auth$
      .login(this.loginGroup.get('email').value, this.loginGroup.get('password').value)
      .subscribe(loginData => {
        this.users$.setCurrentUser(loginData.user);
        this.router.navigate(['dashboard']);
      });
  }

  loginWithFacebook() {
    this.auth$.loginWithFacebook().subscribe(e => console.log(e));
  }

}
