import {Pipe, PipeTransform} from '@angular/core';
import {Transaction} from '../../../shared/interfaces';

@Pipe({name: "searchAmount"})
export class SearchAmountPipe implements PipeTransform{
  transform(transactions: Transaction[], searchAmount = ''): Transaction[] {
    if (!searchAmount.trim()) {
      return transactions;
    }

    if(typeof searchAmount !== 'undefined') {
      if (typeof +searchAmount === 'number') {
        return transactions.filter((transaction) => {
          return Math.abs(transaction.amount) === Math.abs(+searchAmount)
        })
      }
    }
  }
}
