import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {UserService} from '../../services/user.service';
import {User} from '../../../../shared/interfaces';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-account-layout',
  templateUrl: './account-layout.component.html',
  styleUrls: ['./account-layout.component.scss']
})
export class AccountLayoutComponent implements OnInit, OnDestroy {

  user: User = new Object()
  uSub: Subscription

  constructor(
    private router: Router,
    public auth: AuthService,
    public userService: UserService
  ) { }

  ngOnInit() {
    if(this.auth.isAuthenticated()){
      this.uSub = this.userService.getUser().subscribe(user => {
        this.user = user
        this.user.username = this.userService.capitalize(this.user.username)
      })
    }

  }

  logout(event: Event) {
    event.preventDefault()
    this.auth.logout()
    this.router.navigate(['/account', 'login'])
  }

    ngOnDestroy() {
      if(this.uSub) this.uSub.unsubscribe()
    }
}
