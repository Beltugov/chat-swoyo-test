import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {IMessage} from '../interfaces/message.interface';
import {AuthService} from './auth.service';
import {LocalTypes} from '../interfaces/local.interface';

@Injectable()
export class ChatService {
    public messages = new Subject<IMessage[]>();
    private bc = new BroadcastChannel("chat_channel");

    constructor(private authService: AuthService) {
        this.bc.onmessage = (event) => {
            this.updateMessages([...this.getMessages(), event.data]);
        };
    }

    sendMessage(text: IMessage["text"]) {
        const user = this.authService.getUser();
        if (!user) return;

        const message = {
            author: user,
            text: text,
            date: new Date().toLocaleString("ru")
        }

        const updatedChat: IMessage[] = [...this.getMessages(), message]

        localStorage.setItem(LocalTypes.LOCAL_MESSAGES, JSON.stringify(updatedChat))
        this.bc.postMessage(message)

        this.updateMessages(this.getMessages());
    }

    getMessages() {
        return <IMessage[]>JSON.parse(<string>localStorage.getItem(LocalTypes.LOCAL_MESSAGES)) || []
    }

    updateMessages(messages: IMessage[]) {
        this.messages.next(messages)
    }
}
