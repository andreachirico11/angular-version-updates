import { Component, Input, Output, EventEmitter, input, computed, viewChild, ElementRef, OnInit, AfterContentInit, output } from '@angular/core';
import { ListItem } from '../list.item';

@Component({
  selector: 'app-list-item',
  templateUrl: './list.item.component.html',
  styleUrl: './list.item.component.scss',
  standalone: true,
})
export class ListItemComponent implements OnInit, AfterContentInit {
  item = input.required<ListItem>();
  itemDescription = computed(() => "-> " + this.item().description)
  btnRef = viewChild.required<ElementRef>("btn")
  itemClick = output<ListItem>();
  deleteClick = output<number>();

  ngOnInit(): void {
    console.log("ONINIT btn is " + this.btnRef().nativeElement);
  }
  ngAfterContentInit(): void {
    console.log('AFTERVIEWINIT btn is ' + this.btnRef().nativeElement);
  }
  onItemClick(): void {
    this.itemClick.emit(this.item());
  }

  onDeleteClick(): void {
    this.deleteClick.emit(this.item().id);
  }
}
