import { Component, effect, input, signal, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl } from '@angular/forms';
import { merge } from 'rxjs';
import { FormErrorTemplate } from '../shared/form-error-template';

@Component({
  selector: 'app-old-form-error',
    imports: [FormErrorTemplate],
    template: ` <app-form-error-template [errorLabels]="errorLabels()" /> `,
})
export class OldFormError {
  private destroyRef = inject(DestroyRef);
  fieldControl = input.required<FormControl<string | number>>();

  protected errorLabels = signal<string[]>([]);

  constructor() {
    effect(() => {
      const control = this.fieldControl();
      merge(control.statusChanges, control.valueChanges)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => this.updateErrors(control));
      this.updateErrors(control);
    });
  }

  private updateErrors(control: FormControl<string | number>) {
    if (control.status !== 'INVALID') {
      this.errorLabels.set([]);
      return;
    }

    const errors = control.errors;
    if (!errors) {
      this.errorLabels.set([]);
      return;
    }

    this.errorLabels.set(
      Object.keys(errors).map((key) => {
        if (key === 'required') return 'This field is required';
        if (key === 'email') return 'Enter a valid email';
        if (key === 'minlength') return `Minimum length is ${errors[key].requiredLength}`;
        if (key === 'serverError') return `Error saving data`;
        return `Invalid ${key}`;
      })
    );
  }
}
