import {
  Component,
  input,
  model
} from '@angular/core';
import {
  FormValueControl
} from '@angular/forms/signals';
import { ReactionPickerTemplate } from '../shared/reaction-picker-template';

@Component({
  selector: 'reaction-picker',
  imports: [ReactionPickerTemplate],
  host: {
    '[class.disabled-state]': 'disabled()',
  },
  template: `
    <reaction-picker-template
      [disabled]="disabled()"
      [required]="required()"
      [value]="value()"
      (valueChange)="value.set($event)"
    />
  `,
})
export class ReactionPicker implements FormValueControl<string | null> {
  readonly value = model<string | null>(null);
  readonly disabled = input(false);
  readonly required = input(false);
}
