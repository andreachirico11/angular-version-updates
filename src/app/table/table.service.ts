import { Injectable } from '@angular/core';
import { interval, map, tap } from 'rxjs';
import { MOCK_VEHICLES, Vehicle } from './vehicle';

@Injectable({ providedIn: 'root' })
export class TableService {
  private pollingInterval = 1000;

  getVeichles() {
    return interval(this.pollingInterval).pipe(
      tap(() => {
        MOCK_VEHICLES.forEach((v) => {
          this.randomizePlate(v);
        });
      }),
      map(() => [...MOCK_VEHICLES])
    );
  }

  private randomizePlate(vehicle: Vehicle) {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';

    const getRandomChars = (chars: string, length: number): string => {
      return Array.from({ length }, () =>
        chars.charAt(Math.floor(Math.random() * chars.length))
      ).join('');
    };

    vehicle.plate =
      getRandomChars(letters, 2) + getRandomChars(numbers, 3) + getRandomChars(letters, 2);
  }
}
