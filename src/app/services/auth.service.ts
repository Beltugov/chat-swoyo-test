import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {IMessage} from '../interfaces/message.interface';
import {ILocal, LocalTypes} from '../interfaces/local.interface';

@Injectable()
export class AuthService {
    public user = new Subject<string>();

    login(username: string) {
        localStorage.setItem(LocalTypes.LOCAL_USER, username)
        this.user.next(username)
    }

    getUser() {
        return localStorage.getItem(LocalTypes.LOCAL_USER);
    }
}
