import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

import {AuthService} from '../shared/services/auth.service';
import {UserService} from '../shared/services/user.service';
import {User} from '../../shared/interfaces';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  greeting: string = this.userService.greeting()
  user: User = new Object()
  uSub: Subscription

  constructor(
    private auth: AuthService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadUser()
  }

  loadUser(){
    if (this.auth.isAuthenticated()){
      this.uSub = this.userService.getUser().subscribe(user => {
        this.user = user
        this.user.username = this.userService.capitalize(this.user.username)
      })
    }
  }

  newTransaction(event: Event) {
    event.preventDefault()
    this.router.navigate(['/account', 'transaction'])
  }

  ngOnDestroy() {if(this.uSub) this.uSub.unsubscribe()}
}

