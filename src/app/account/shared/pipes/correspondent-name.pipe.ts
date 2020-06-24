import {Pipe, PipeTransform} from '@angular/core';
import {Transaction, User} from '../../../shared/interfaces';

@Pipe({name: 'correspondentName'})
export class CorrespondentNamePipe implements PipeTransform{

  transform(users: User[], correspondentName = ''): User[] {
    if (!correspondentName) return users

    if (!correspondentName.trim()) {
      return users;
    }

    return users.filter((user) => {
      return user.name.toLowerCase().includes(correspondentName.toLowerCase());
    });
  }

}
