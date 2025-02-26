import {Component} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ChatService} from '../../services/chat.service';

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        FormsModule
    ],
    styleUrl: './input.component.scss'
})
export class InputComponent {
    public message: string = ""
    private bc = new BroadcastChannel("chat_channel");

    constructor(private chatService: ChatService) {
        this.bc.onmessage = (event) => {
            this.chatService.sendMessage(event.data);
        };
    }

    send(e?: KeyboardEvent) {
        if (e?.key !== 'Enter' && e !== undefined) return;
        if (this.message.trim() === '') return;

        this.bc.postMessage(this.message)
        this.chatService.sendMessage(this.message)
        this.message = ""
    }
}
