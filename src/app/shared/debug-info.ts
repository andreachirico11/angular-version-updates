import { JsonPipe } from '@angular/common';
import { Component, Input, input, OnChanges, SimpleChanges } from '@angular/core';
import { User } from './models';

@Component({
  selector: 'app-debug-info',
  imports: [JsonPipe],
  template: `
    <div class="debug-info">
      <h3>Current values:</h3>
      <pre>{{ value | json }}</pre>
      <p>Form valid: {{ valid ? 'Yes' : 'No' }}</p>
    </div>
  `,
  styles: [
    `
      .debug-info {
        margin-top: 2rem;
        padding: 1rem;
        background-color: #f5f5f5;
        border-radius: 4px;
      }

      .debug-info h3 {
        margin-top: 0;
        color: #666;
        font-size: 0.875rem;
      }
    `,
  ],
})
export class DebugInfo implements OnChanges {
  @Input({required: true}) value!: User | null;
  @Input({required: true}) valid!: boolean;

  ngOnChanges(changes: SimpleChanges<{value: User, valid: boolean}>): void {
    if (changes.valid && changes.value) {
      console.log('both changed');
    } else if (changes.valid && !changes.value) {
      console.log('only value');
    } else if (changes.value && !changes.valid) {
      console.log('only value');
    }
  }
}
