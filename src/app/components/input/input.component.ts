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

    constructor(private chatService: ChatService) {
    }

    send(e?: KeyboardEvent) {
        if (e?.key !== 'Enter' && e !== undefined) return;
        if (this.message.trim() === '') return;

        this.chatService.sendMessage(this.message)
        this.message = ""
    }
}
