import { afterRenderEffect, Component, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TableRowComponent } from './table-row/table-row.component';
import { TableService } from './table.service';
import { ROUTER_OUTLET_DATA } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  imports: [TableRowComponent],
})
export class TableComponent {
  readonly routerOutletData = inject(ROUTER_OUTLET_DATA) as Signal<string>;
  private tableService = inject(TableService);
  protected vehicles = toSignal(this.tableService.getVeichles(), {
    equal: (oldVs, newVs) => {
      if (!newVs || !oldVs) {
        return false;
      }
      return newVs.every((v) => {
        const oldV = oldVs.find(({ id }) => v.id === id);
        return !!oldV && oldV.plate === v.plate;
      });
    },
  });
  constructor() {
    afterRenderEffect(() => {
      console.log("counter from header: "+ this.routerOutletData());
    })
  }
}
