import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import { Vehicle } from '../vehicle';
import { StatusLabelPipe } from '../status-label.pipe';

@Component({
  selector: 'app-table-row-detail-body',
  imports: [NgClass, StatusLabelPipe],
  template: `
    <div class="detail-row">
      <span class="label">Marca:</span>
      <span class="value">{{ vehicle().brand }}</span>
    </div>
    <div class="detail-row">
      <span class="label">Modello:</span>
      <span class="value">{{ vehicle().model }}</span>
    </div>
    <div class="detail-row">
      <span class="label">Anno:</span>
      <span class="value">{{ vehicle().year }}</span>
    </div>
    <div class="detail-row">
      <span class="label">Targa:</span>
      <span class="value plate-detail">{{ vehicle().plate }}</span>
    </div>
    <div class="detail-row">
      <span class="label">Chilometraggio:</span>
      <span class="value">{{ vehicle().kilometers }} km</span>
    </div>
    <div class="detail-row">
      <span class="label">Stato:</span>
      <span class="status-badge small" [ngClass]="vehicle().status">
        {{ vehicle() | statusLabel }}
      </span>
    </div>
  `,
  styleUrl: './table-row-detail-body.component.scss',
})
export class TableRowDetailBodyComponent {
  vehicle = input.required<Vehicle>();
}
