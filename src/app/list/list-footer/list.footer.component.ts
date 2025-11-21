import { Component, input, linkedSignal } from '@angular/core';
import { SpinnerComponent } from '../../spinner.component';

@Component({
  selector: 'app-list-footer',
  templateUrl: './list.footer.component.html',
  styleUrl: './list.footer.component.scss',
  standalone: true,
  imports: [SpinnerComponent]
})
export class ListFooterComponent {
  selectedItemIds = input.required<number[]>();
  loading = linkedSignal<number[], boolean>({
    source: this.selectedItemIds,
    computation: () => {
      setTimeout(() => {
        this.loading.set(false);
      }, 1000);
      return true;
    },
  });
}
