import { AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent  implements OnInit, AfterViewInit, AfterViewChecked, DoCheck, OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    console.log("ONCHANGES -> headercomponent");
  }
  ngDoCheck(): void {
    console.log("DOCHECK -> headercomponent");
  }
  ngOnInit(): void {
    console.log("ONINIT -> headercomponent");

  }
  ngAfterViewInit(): void {
    console.log("AFTERVIEWINIT -> headercomponent");
  }
  ngAfterViewChecked(): void {
    console.log("AFTERVIEWCHECKED -> headercomponent");
  }

}
