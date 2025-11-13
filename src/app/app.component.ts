import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // now is possible to mix inline style with file styles
  styles: [
    `
      p {
        color: purple;
      }
    `,
  ],
  styleUrls: ['./app.component.style.scss'],
})
export class AppComponent implements OnInit {
  // possiblyNull: string //from angular 12 this will be error
  possiblyNull: string = ''; // props must be initialized

  // ! to assert the obj is initialized
  objWithNulls!: {
    prop: string;
  };

  ngOnInit() {
    if (this.objWithNulls.prop) {
      console.log('Will give error');
    }
    if (this.objWithNulls?.prop) {
      console.log("Won't");
    }
  }
}
