import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import createNumberMask from 'text-mask-addons/dist/createNumberMask'

import {User, UserFilter} from '../../shared/interfaces';
import {UserService} from '../shared/services/user.service';
import {AuthService} from '../shared/services/auth.service';


@Component({
  selector: 'app-transaction-page',
  templateUrl: './transaction-page.component.html',
  styleUrls: ['./transaction-page.component.scss']
})
export class TransactionPageComponent implements OnInit, OnDestroy {
  users: User[] = []
  uSub: Subscription
  // correspondentName = ''
  filter: UserFilter = {filter: ""}
  selected = false
  // userName = ''
  // amount = ''
  user: User = new Object()
  form: FormGroup

  currencyMask = createNumberMask({
    prefix: '',
    suffix: ' $',
    includeThousandsSeparator: false,
    thousandsSeparatorSymbol: '',
    allowDecimal: true,
    decimalSymbol: '.',
    decimalLimit: 2,
    integerLimit: 5,
    requireDecimal: false,
    allowNegative: false,
    allowLeadingZeroes: false
  });


  constructor(
    public auth: AuthService,
    private userService: UserService
  ) { }

  ngOnInit() {
    if (this.auth.isAuthenticated()) {
      this.uSub = this.userService.getUser().subscribe(user => {this.user = user})
    }

    this.form = new FormGroup({
      correspondent: new FormControl(null, [
        Validators.required
      ]),
      amount: new FormControl(null, [
        Validators.required,
      ])
    })
  }

  onSelect(user: User) {
    if (!this.selected) {
      this.form.get('correspondent').setValue(user.name)
      this.selected = true
    }
  }

  searchCorrespondent() {
    if(this.form.value.correspondent){
      this.filter.filter = this.form.value.correspondent  //this.correspondentName
      this.uSub = this.userService.getUsersFiltered(this.filter).subscribe(users => {
        this.users = users
      })
    } else {
      this.users = []
      // this.correspondentName = ''
      this.selected = false
    }
  }

  submit() {
    console.log(this.form.value.correspondent, +this.form.value.amount.split(' ')[0])
  }

  ngOnDestroy(){
    if (this.uSub){this.uSub.unsubscribe()}
  }
}
