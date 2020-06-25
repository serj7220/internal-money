import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';

import {NewTransaction, User, UserFilter} from '../../shared/interfaces';
import {TransactionsService} from '../../shared/transactions.service';
import {UserService} from '../shared/services/user.service';
import {AuthService} from '../shared/services/auth.service';

@Component({
  selector: 'app-transaction-page',
  templateUrl: './transaction-page.component.html',
  styleUrls: ['./transaction-page.component.scss']
})
export class TransactionPageComponent implements OnInit, OnDestroy {
  user: User = new Object()
  users: User[] = []
  uSub: Subscription
  tSub: Subscription
  filter: UserFilter = {filter: ""}
  selected = false
  form: FormGroup
  newTransaction: NewTransaction

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
    private userService: UserService,
    private transactionsService: TransactionsService
  ) { }

  ngOnInit() {
    this.loadUser()

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
      this.filter.filter = this.form.value.correspondent
      this.uSub = this.userService.getUsersFiltered(this.filter).subscribe(users => {
        this.users = users
      })
    } else {
      this.users = []
      this.selected = false
    }
  }

  loadUser(){
    if (this.auth.isAuthenticated()) {
      this.uSub = this.userService.getUser().subscribe(user => {
        this.user = user
        this.form.get('amount').setValidators(Validators.max(this.user.balance))
      })
    }
  }

  submit() {
    this.newTransaction = {
      name: this.form.value.correspondent,
      amount: this.form.value.amount.split(' ')[0]
    }

    this.tSub = this.transactionsService.newTransaction(this.newTransaction).subscribe(() => {
      this.form.reset()
      this.loadUser()
    })
  }

  ngOnDestroy(){
    if (this.uSub){this.uSub.unsubscribe()}
    if (this.tSub){this.tSub.unsubscribe()}
  }
}
