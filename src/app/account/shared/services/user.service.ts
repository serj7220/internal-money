import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {User} from '../../../shared/interfaces';

@Injectable({ providedIn: "root" })
export class UserService {

  user: User
  constructor(http: HttpClient){}

}
