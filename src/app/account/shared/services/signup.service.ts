import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, Subject, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';

import {DbAuthResponse, User} from '../../../shared/interfaces';
import {environment} from 'src/environments/environment';

@Injectable()
export class SignupService{

  public error$: Subject<string> = new Subject<string>()

  constructor(private http: HttpClient){}

  signup(user: User): Observable<any>{
    return this.http.post(`${environment.DbCreateUserUrl}`, user)
      .pipe(
        tap(this.setToken),
        catchError(this.handleError.bind(this))
      )
  }

  private handleError(error: HttpErrorResponse) {
    const message = error.error
    this.error$.next(message)
    return throwError(error)
  }

  private setToken(response: DbAuthResponse | null){
    if(response){
      localStorage.setItem('db-token', response.id_token)
    } else {
      localStorage.clear()
    }
  }
}
