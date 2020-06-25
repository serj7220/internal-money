import {RxwebValidators} from '@rxweb/reactive-form-validators'
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import {User} from '../../shared/interfaces';
import {SignupService} from '../shared/services/signup.service';
import {AuthService} from '../shared/services/auth.service';
import {UserService} from '../shared/services/user.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit {

  form: FormGroup
  submitted = false
  user: User
  uSub: Subscription

  constructor(
    public signup: SignupService,
    private router: Router,
    private auth: AuthService,
    private userService: UserService
  ) { }

  ngOnInit() {

    this.form = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ]),
      confirmPassword: new FormControl(null, [
        Validators.required, RxwebValidators.compare({fieldName: 'password'})
      ])
    })
  }

  submit() {
    this.submitted = true;
    if(this.form.invalid){
      return
    }

 const user: User = {
      username: this.form.value.name,
      email: this.form.value.email,
      password: this.form.value.password
    }

    this.signup.signup(user).subscribe(() => {
      this.form.reset()
      this.loadUser()
      this.router.navigate(['/account', 'dashboard'])
      this.submitted = false
    })
  }

  loadUser(){
    if (this.auth.isAuthenticated()){
      this.uSub = this.userService.getUser().subscribe(user => {
        this.user = user
        this.user.username = this.userService.capitalize(this.user.username)
      })
    }
  }

  login() {
    this.router.navigate(['/account', 'login'])
  }
}
