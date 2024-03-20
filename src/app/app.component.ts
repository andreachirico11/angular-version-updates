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
    FatherComponent
  ],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, AfterViewInit, AfterViewChecked, DoCheck, OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    console.log('ONCHANGES -> appcomponent');
  }
  ngDoCheck(): void {
    console.log('DOCHECK -> appcomponent');
  }
  ngOnInit(): void {
    console.log('ONINIT -> appcomponent');
  }
  ngAfterViewInit(): void {
    console.log('AFTERVIEWINIT -> appcomponent');
  }
  ngAfterViewChecked(): void {
    console.log('AFTERVIEWCHECKED -> appcomponent');
  }

  constructor(public dataService: DataService) {
    this.posts = dataService.getPosts().pipe(map(posts => posts.slice(0, 10)));
  }

  isLoggedIn = true;
  userType: 'moderator' | 'admin' | 'user' = 'moderator';

  posts: Observable<any[]>
}
