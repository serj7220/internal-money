import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {TransactionsService} from '../../shared/transactions.service';
import {Transaction} from '../../shared/interfaces';

@Component({
  selector: 'app-transactions-page',
  templateUrl: './transactions-page.component.html',
  styleUrls: ['./transactions-page.component.scss']
})
export class TransactionsPageComponent implements OnInit, OnDestroy {

  transactions: Transaction[]
  tSub: Subscription
  searchByName = ''
  searchByDate = ''
  searchByAmount = ''

  constructor(
    private transactionsService: TransactionsService,
  ) { }

  ngOnInit() {
    this.tSub = this.transactionsService.getAll().subscribe(transactions => {
      this.transactions =
        transactions.sort((a, b) => {return new Date(b.date).getTime() - new Date(a.date).getTime()})
    })
  }

  ngOnDestroy() {if(this.tSub) this.tSub.unsubscribe()}
}
