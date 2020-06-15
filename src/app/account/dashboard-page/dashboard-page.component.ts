import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {
  greeting: string = 'Good Day'
  username: string = ''

  constructor() { }

  ngOnInit(): void {
  }

}
