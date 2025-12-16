import { Component, computed, input } from '@angular/core';
import { FieldState } from '@angular/forms/signals';
import { FormErrorTemplate } from '../shared/form-error-template';

@Component({
  selector: 'app-form-error',
  imports: [FormErrorTemplate],
  template: ` <app-form-error-template [errorLabels]="errorLabels()" /> `,
})
export class FormError {
  fieldControl = input<FieldState<string, string | number>>();

  protected errorLabels = computed<string[]>(() => {
    const signalControl = this.fieldControl();
    if (!!signalControl && signalControl.errors().length) {
      return signalControl.errors().map(({ message }) => message || 'Unknown Error');
    }
    return [];
  });
}
