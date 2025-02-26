import {Component} from '@angular/core';
import {ChatService} from './services/chat.service';
import {FormsModule} from '@angular/forms';
import {MessageListComponent} from './components/message-list/message-list.component';
import {LoginComponent} from './components/login/login.component';
import {NgIf} from '@angular/common';
import {AuthService} from './services/auth.service';
import {InputComponent} from './components/input/input.component';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    imports: [
        FormsModule,
        MessageListComponent,
        NgIf,
        LoginComponent,
        InputComponent,
    ],
    standalone: true,
    styleUrl: './app.component.scss',
    providers: [ChatService, AuthService]
})
export class AppComponent {
    public isAuth: boolean;
    public user: string | null;


    constructor(
        private authService: AuthService,
    ) {
        this.authService.user.subscribe((value) => {
            this.isAuth = Boolean(value)
            this.user = value;
        })

        this.isAuth = Boolean(this.authService.getUser())
        this.user = this.authService.getUser()
    }


}
