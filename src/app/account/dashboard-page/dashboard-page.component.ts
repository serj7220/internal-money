import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../shared/services/user.service';
import {Subscription} from 'rxjs';
import {User} from '../../shared/interfaces';
import {AuthService} from '../shared/services/auth.service';
import {Router} from '@angular/router';

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
    if (this.auth.isAuthenticated()){
      this.uSub = this.userService.getUser().subscribe(user => {
        this.user = user
        this.user.username = this.userService.capitalize(this.user.username)
      })
    }
  }

  ngOnDestroy() {
    if(this.uSub) this.uSub.unsubscribe()
  }

  newTransaction(event: Event) {
    event.preventDefault()
    this.router.navigate(['/account', 'transaction'])
  }
}

