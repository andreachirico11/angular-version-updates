import {
  Component,
  input,
  model,
  signal
} from '@angular/core';

@Component({
  selector: 'reaction-picker-template',
  host: {
    '[class.disabled-state]': 'disabled()',
  },
  template: `
    @if (required()) {
    <span class="required-marker">*</span>
    } @for (reaction of reactions(); track $index) {
    <div class="reaction" [class.selected]="isSelected(reaction)" (click)="value.set(reaction)">
      {{ reaction }}
    </div>
    }
  `,
})
export class ReactionPickerTemplate {
  reactions = signal(['🤬', '😠', '😐', '😊', '😍']);
  readonly value = model<string | null>(null);
  readonly disabled = input(false);
  readonly required = input(false);

  protected isSelected(reaction: string) {
    return this.value() === reaction;
  }
}
