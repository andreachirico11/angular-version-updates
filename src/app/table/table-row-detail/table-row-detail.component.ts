import { Component, input } from '@angular/core';
import { Vehicle } from '../vehicle';
import { TableRowDetailBodyComponent } from './table-row-detail-body.component';

@Component({
  selector: 'app-table-row-detail',
  imports: [TableRowDetailBodyComponent],
  template: `
    <div class="detail-modal">
      <div class="modal-header">
        <h4>Dettagli Veicolo</h4>
        <span class="vehicle-id">#{{ vehicle().id }}</span>
      </div>
      <div class="modal-body">
        @defer (on hover) {
        <app-table-row-detail-body [vehicle]="vehicle()" />
        } @placeholder {
        <button class="action-button">more details</button>
        }
      </div>
      <div class="modal-footer">
        <small>Dettagli completi del veicolo</small>
      </div>
    </div>
  `,
  styleUrl: './table-row-detail.component.scss',
})
export class TableRowDetailComponent {
  vehicle = input.required<Vehicle>();
}
