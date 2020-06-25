import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, Subject, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Injectable} from '@angular/core';

import {NewTransaction, Transaction} from './interfaces';
import {environment} from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class TransactionsService {
  public error$: Subject<string> = new Subject<string>()

  constructor(private http: HttpClient){}

  public getAll(): Observable<Transaction[]> {
    return this.http.get(`${environment.DbListTransUrl}`)
      .pipe(map((response: {[key: string]: any}) => {return response.trans_token}))
  }

  newTransaction(newTrans: NewTransaction): Observable<any>{
    return this.http.post(`${environment.DbListTransUrl}`, newTrans)
      .pipe(
        catchError(this.handleError.bind(this))
      )
  }

  handleError(error: HttpErrorResponse) {
    const message = error.error
    this.error$.next(message)
    return throwError(error)
  }
}
