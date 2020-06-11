import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {RxwebValidators} from '@rxweb/reactive-form-validators'

import {User} from '../../shared/interfaces';
import {SignupService} from '../shared/services/signup.service';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit {

  form: FormGroup

  constructor(
    public signup: SignupService,
    private router: Router,
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
    if(this.form.invalid){
      return
    }

 const user: User = {
      username: this.form.value.name,
      email: this.form.value.email,
      password: this.form.value.password
    }

    console.log('User',user)
    this.signup.signup(user).subscribe(() => {
      this.form.reset()
      this.router.navigate(['/account', 'dashboard'])
    })
  }
}

