import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [
    `
      p {
        color: purple;
      }
    `,
  ],
  styleUrl: './app.component.style.scss',
})

// now is possible to mix inline style with file styles
export class AppComponent {
  // possiblyNull: string //from angular 12 this will be error
  possiblyNull: string = ''; // props must be initialized
  objWithNulls!: {
    prop: string;
  }; // ! to assert the obj is initialized

  ternary = 'Ternary';
  nullish = 'Nullish Coalescing (??)';
  or = 'OR (||)';
  and = 'AND (&&)';

  valueNull = null;
  valueUndefined = undefined;
  valueZero = 0;
  valueEmptyStr = '';

  tests = [this.ternary, this.nullish, this.or, this.and];
  testValues = [this.valueNull, this.valueUndefined, this.valueZero, this.valueEmptyStr];

  truthy = 'truthy';
  falsy = 'falsy';

  constructor() {
    // if (this.objWithNulls.prop) {
    //   console.log("Will give error");
    // }
    if (this.objWithNulls?.prop) {
      console.log("Won't");
    }
  }

  applyTestValues(
    testName: typeof this.ternary | typeof this.nullish | typeof this.or | typeof this.and,
    testValue:
      | typeof this.valueNull
      | typeof this.valueUndefined
      | typeof this.valueZero
      | typeof this.valueEmptyStr
  ) {
    switch (testName) {
      case this.ternary:
        return testValue ? this.truthy : this.falsy;
      case this.nullish:
        return this.ifFalsyPrintFalsy(testValue ?? this.falsy);
      case this.or:
        return this.ifFalsyPrintFalsy(testValue || this.falsy);
      case this.and:
        return this.ifTruthyPrintTruthy(testValue && this.truthy);
      default:
        return '';
    }
  }

  ifTruthyPrintTruthy(value: typeof this.truthy | any) {
    return value ? this.truthy : this.falsy;
  }

  ifFalsyPrintFalsy(value: typeof this.falsy | any) {
    return value === this.falsy ? this.falsy : this.truthy;
  }
}
