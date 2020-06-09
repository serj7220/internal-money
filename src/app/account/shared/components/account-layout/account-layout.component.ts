import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-account-layout',
  templateUrl: './account-layout.component.html',
  styleUrls: ['./account-layout.component.scss']
})
export class AccountLayoutComponent implements OnInit {

  constructor(private  router: Router) { }

  ngOnInit(): void {
  }

  logout(event: Event) {
    event.preventDefault()
    this.router.navigate(['/account', 'login'])
  }
}
