import { Component, Injector, Input, OnChanges, OnInit, Signal, SimpleChanges } from '@angular/core';
import { DataService } from '../data.service';
import { NgFor } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [NgFor],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnChanges {
  @Input() ofWhat: 'users' | 'albums' = 'users';

  list!: Signal<string[] | undefined>;

  constructor(private data: DataService, private inj: Injector) {}

  ngOnChanges(c: SimpleChanges): void {
    if (c['ofWhat']) {
      this.list = toSignal(this.ofWhat === 'users' ? this.data.getUsers() : this.data.getAlbums(), {
        injector: this.inj,
      });
    }
  }
}
