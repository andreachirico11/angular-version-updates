import { Component, Input, Output, EventEmitter, input, OnChanges, SimpleChanges, effect, model, output } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { FormsModule, NgModel } from '@angular/forms';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-list-header',
  templateUrl: './list.header.component.html',
  styleUrl: './list.header.component.scss',
  standalone: true,
  imports: [FormsModule],
})
export class ListHeaderComponent implements OnChanges {
  title = input<string>('');
  @Input() oldCounter = 0;
  newCounter = input('', {
    transform: (val: number) => 'New Counter: ' + val,
  });
  customDescription = model<string>('');

  addClick = output<void>();
  private deleteAll$ = new Subject<void>();
  deleteAll = outputFromObservable(this.deleteAll$);

  constructor() {
    effect(() => {
      console.log(`New counter changed: ${this.newCounter()}`);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    const change = changes['oldCounter'];
    if (change) {
      console.log(`Old counter changed: ${change.currentValue}`);
    }
  }

  onAddClick(): void {
    this.addClick.emit();
  }

  onDelete() {
    this.deleteAll$.next();
  }
}
