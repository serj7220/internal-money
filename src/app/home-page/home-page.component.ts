import { Component, OnInit } from '@angular/core';
import {AuthService} from '../account/shared/services/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  linkLogin: string = 'account/login'
  linkRegister: string = 'account/registration'

  constructor(public auth: AuthService) { }

  ngOnInit(){
    if (this.auth.isAuthenticated()){
      this.linkLogin = this.linkRegister = 'account/dashboard'
    } else {
      this.linkLogin = 'account/login'
      this.linkRegister = 'account/registration'
    }
  }
}
