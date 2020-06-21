import {Pipe, PipeTransform} from '@angular/core';
import {Transaction} from '../../../shared/interfaces';

@Pipe({name: "searchName"})
export class SearchNamePipe implements PipeTransform {
  transform(transactions: Transaction[], searchName = ''): Transaction[] {
    if (!searchName.trim()) {
      return transactions;
    }

    return transactions.filter((transaction) => {
      return transaction.username.toLowerCase().includes(searchName.toLowerCase());
    });
  }
}
