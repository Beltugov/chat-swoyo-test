import {AfterViewChecked, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MessageComponent} from '../message/message.component';
import {ChatService} from '../../services/chat.service';
import {IMessage} from '../../interfaces/message.interface';
import { ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'app-message-list',
    templateUrl: './message-list.component.html',
    imports: [
        CommonModule,
        MessageComponent
    ],
    standalone: true,
    styleUrl: './message-list.component.scss'
})

export class MessageListComponent implements OnInit, AfterViewChecked {
    @ViewChild('messageList') private myScrollContainer: ElementRef | undefined;
    messages: IMessage[]

    constructor(
        private chatService: ChatService,
        private changeDetectorRefs: ChangeDetectorRef,
    ) {
        this.chatService.messages.subscribe((value) => {
            this.messages = value
            this.changeDetectorRefs.detectChanges();
        })

        this.messages = this.chatService.getMessages();
    }

    ngAfterViewChecked() {
        if (!this.myScrollContainer) return
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    }

    ngOnInit() {
        this.chatService.updateMessages(this.messages);
    }

}
