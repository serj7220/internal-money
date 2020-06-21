import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, Subject, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

import {DbAuthResponse, User} from '../../../shared/interfaces';
import {environment} from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class AuthService{

  public error$: Subject<string> = new Subject<string>()

  constructor(private http: HttpClient){}

  get token(): string{
    return localStorage.getItem('db-token')
  }

  login(user: User): Observable<any>{
    return this.http.post(`${environment.DbLoginUrl}`, user)
      .pipe(
        tap(this.setToken),
        catchError(this.handleError.bind(this))
      )
  }

  logout(){
    this.setToken(null)
  }

  isAuthenticated(): boolean{
    return !!this.token
  }

  // temp private
  handleError(error: HttpErrorResponse) {
    const message = error.error
    this.error$.next(message)
    return throwError(error)
  }

  //temp private
  setToken(response: DbAuthResponse | null){
    if(response){
      localStorage.setItem('db-token', response.id_token)
    } else {
      localStorage.clear()
    }
  }
}
