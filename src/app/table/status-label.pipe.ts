import { Pipe, PipeTransform } from '@angular/core';
import { Vehicle } from './vehicle';

@Pipe({
  name: 'statusLabel',
})
export class StatusLabelPipe implements PipeTransform {
  transform({ status }: Vehicle): string {
    const statusLabels = {
      available: 'Disponibile',
      'in-use': 'In uso ',
      maintenance: 'Manutenzione',
    };
    return statusLabels[status];
  }
}
