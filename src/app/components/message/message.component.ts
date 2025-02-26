import {ChangeDetectorRef, Component, Input} from '@angular/core';
import {IMessage} from '../../interfaces/message.interface';
import {NgClass} from '@angular/common';
import {ChatService} from '../../services/chat.service';
import {AuthService} from '../../services/auth.service';

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html',
    standalone: true,
    imports: [
        NgClass
    ],
    styleUrl: './message.component.scss'
})
export class MessageComponent {
    @Input() public message!: IMessage;

    constructor(
        private authService: AuthService,

    ) {
    }

    setSide() {
        return this.authService.getUser() === this.message.author
    }

    protected readonly Date = Date;
    protected readonly String = String;
}
