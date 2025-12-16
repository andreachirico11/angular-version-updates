import { Component, input } from '@angular/core';

@Component({
  selector: 'app-form-error-template',
  template: `
    @for(error of errorLabels(); track $index) {
    <span class="error">{{ error }}</span>
    }
  `,
  styles: [
    `
      .error {
        display: block;
        color: #d32f2f;
        font-size: 0.875rem;
        margin-top: 0.25rem;
      }
    `,
  ],
})
export class FormErrorTemplate {
  errorLabels = input.required<string[]>();
}
