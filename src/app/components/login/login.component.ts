import {Component} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from '../../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        FormsModule
    ],
    styleUrl: './login.component.scss'
})
export class LoginComponent {
    public user: string = ""

    constructor(private authService: AuthService) {
    }

    login(e?:KeyboardEvent) {
        if (e?.key !== 'Enter' && e !== undefined) {
            return;
        }

        this.authService.login(this.user)
    }


}
