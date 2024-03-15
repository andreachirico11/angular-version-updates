import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.style.scss'],
  styles: [`
    p {
      color: purple
    }
  `]
})

// now is possible to mix inline style with file styles

export class AppComponent {
  nullValue = null;
  undefinedValue = undefined;
  zeroValue = 0;
  emptyStrValue = '';


  // possiblyNull: string //from angular 12 this will be error
  possiblyNull: string = ''; // props must be initialized
  objWithNulls!: {
    prop: string
  }; // ! to assert the obj is initialized

  constructor() {
    // if (this.objWithNulls.prop) {
    //   console.log("Will give error");
    // }
    if (this.objWithNulls?.prop) {
      console.log("Won't");
    }
  }
}
