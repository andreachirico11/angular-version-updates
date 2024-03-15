import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map, startWith } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  maxValidator = Validators.max(10);
  control = new FormControl(0, [Validators.required, Validators.min(0), this.maxValidator]);
  get controlStatus() {
    return this.control.status;
  }
  get controlStatus$() {
    return this.control.statusChanges.pipe(
      startWith(this.controlStatus),
      map((_) => this.controlStatus)
    );
  }
  form = new FormGroup({
    contro: this.control,
  });

  toggleMax() {
    // new form tools
    if (this.control.hasValidator(this.maxValidator)) {
      this.control.removeValidators([this.maxValidator]);
    } else {
      this.control.addValidators([this.maxValidator]);
    }
    this.control.updateValueAndValidity();
  }

  onSubmit() {}
}
