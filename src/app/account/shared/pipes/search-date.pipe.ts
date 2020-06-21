import {Pipe, PipeTransform} from '@angular/core';
import {Transaction} from '../../../shared/interfaces';
import {DatePipe} from '@angular/common';

@Pipe({
  name: "searchDate"
})
export class SearchDatePipe implements PipeTransform{
  transform(transactions: Transaction[], searchDate: string): Transaction[] {
    const resultArray = new Array()

    if (!searchDate.trim()) {
      return transactions;
    }

    if (searchDate.length === 10){
      const arr = searchDate.split(".")
      const datePipe = new Date(+arr[2], +arr[1], +arr[0]).getDate()

      transactions.forEach( transaction => {
        const transactionDate = new Date(transaction.date).getDate()
        if(datePipe === transactionDate){
          resultArray.push(transaction)
        }
      })
      return resultArray
    }
  }
}
