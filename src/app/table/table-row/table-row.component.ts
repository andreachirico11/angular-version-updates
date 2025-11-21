import { NgClass } from '@angular/common';
import { Component, input, signal } from '@angular/core';
import { StatusLabelPipe } from '../status-label.pipe';
import { TableRowDetailComponent } from '../table-row-detail/table-row-detail.component';
import { Vehicle } from '../vehicle';

@Component({
  selector: 'app-table-row',
  imports: [NgClass, TableRowDetailComponent, StatusLabelPipe],
  template: `
    <tr>
      <td>{{ vehicle().id }}</td>
      <td>{{ vehicle().brand }}</td>
      <td>{{ vehicle().model }}</td>
      <td>{{ vehicle().year }}</td>
      <td class="plate">{{ vehicle().plate }}</td>
      <td>{{ vehicle().kilometers }} km</td>
      <td>
        <span class="status-badge" [ngClass]="vehicle().status">
          {{ vehicle() | statusLabel }}
        </span>
      </td>
      <td>
        <div class="table-actions">
          <button class="action-btn view" (click)="showDetails.set(true)">👁</button>
          <button class="action-btn edit">✎</button>
          <button class="action-btn delete">✕</button>
        </div>
      </td>
    </tr>
    @defer (when showDetails()) {
    <app-table-row-detail [vehicle]="vehicle()" />
    }
  `,
  styleUrl: './table-row.component.scss',
})
export class TableRowComponent {
  vehicle = input.required<Vehicle>();
  showDetails = signal<boolean>(false);
}
