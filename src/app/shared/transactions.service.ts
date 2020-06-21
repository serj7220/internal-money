import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Transaction} from './interfaces';
import {environment} from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class TransactionsService {

  constructor(private http: HttpClient){}

  public getAll(): Observable<Transaction[]> {
    return this.http.get(`${environment.DbListTransUrl}`)
      .pipe(map((response: {[key: string]: any}) => {return response.trans_token}))
  }
}
