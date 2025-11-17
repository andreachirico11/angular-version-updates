import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { ModeratorDashboardComponent } from './moderator-dashboard/moderator-dashboard.component';
import { DataService } from './data.service';
import { AsyncPipe } from '@angular/common';
import { Observable, map } from 'rxjs';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { FatherComponent } from './father/father.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    UserDashboardComponent,
    ModeratorDashboardComponent,
    AdminDashboardComponent,
    AsyncPipe,
    FatherComponent,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  isLoggedIn = true;
  userType: 'moderator' | 'admin' | 'user' = 'moderator';
  posts!: Observable<any[]>;

  constructor(public dataService: DataService) {}

  ngOnInit(): void {
    this.posts = this.dataService.getPosts().pipe(map((posts) => posts.slice(0, 10)));
  }
}
