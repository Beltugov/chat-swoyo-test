import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {IMessage} from '../interfaces/message.interface';
import {AuthService} from './auth.service';
import {LocalTypes} from '../interfaces/local.interface';

@Injectable()
export class ChatService {
    public messages = new Subject<IMessage[]>();

    constructor(private authService: AuthService) {

    }

    sendMessage(message: IMessage["text"]) {
        const user = this.authService.getUser();
        if (!user) return;

        const updatedChat: IMessage[] = [...this.getMessages(), {
            author: user,
            text: message,
            date: new Date().toLocaleString("ru")
        }]

        localStorage.setItem(LocalTypes.LOCAL_MESSAGES, JSON.stringify(updatedChat))

        this.updateMessages(this.getMessages());
    }

    getMessages() {
        return <IMessage[]>JSON.parse(<string>localStorage.getItem(LocalTypes.LOCAL_MESSAGES)) || []
    }

    updateMessages(messages: IMessage[]) {
        this.messages.next(messages)
    }
}
