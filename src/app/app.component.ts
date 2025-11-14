import {
  Component
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthButtonComponent } from './auth-button/auth-button.component';
import { HeaderComponent } from './header/header.component';
import { ListComponent } from './list/list.component';
import { LoadingbarComponent } from './loadingbar/loadingbar.component';
import { ProfileComponent } from './profile/profile.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    AuthButtonComponent,
    ProfileComponent,
    HeaderComponent,
    LoadingbarComponent,
    ListComponent,
    RouterOutlet
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {}
