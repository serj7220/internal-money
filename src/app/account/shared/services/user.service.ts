import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User, UserFilter, UserList, UserResponse} from '../../../shared/interfaces';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {environment} from 'src/environments/environment';
import {AuthService} from './auth.service';

@Injectable({ providedIn: "root" })
export class UserService {

  user: User = new Object()
  users: UserList[] = []

  constructor(
    private auth: AuthService,
    private http: HttpClient
  ){}

  getUser(): Observable<User>{
    return this.http.get(`${environment.DbUserInfoUrl}`)
      .pipe(map((response: UserResponse) => {
        this.user.id = response.user_info_token.id
        this.user.username = response.user_info_token.name
        this.user.email = response.user_info_token.email
        this.user.balance = response.user_info_token.balance
        return this.user
      }))
  }

  getUsersFiltered(filter: UserFilter):Observable<User[]>{
    return this.http.post(`${environment.DbListUsers}`, filter)
      .pipe(map((response: UserList[]) => {
        this.users = response
        return this.users
      }))
  }

// this.users.id = response
// return response

capitalize(str) {
    return str.replace(/(^|\s)\S/g, function(a) {return a.toUpperCase()})
  }

  greeting(){
    const now =(new Date()).getHours()
    let greeting = ''
    if (now > 23 || now < 7) greeting = 'Good morning'
    if (now > 6 && now < 12) greeting = 'Good morning'
    if (now > 11 && now < 19) greeting =  'Good afternoon'
    if (now > 18 && now < 24) greeting =  'Good evening'
    return greeting
  }
}
