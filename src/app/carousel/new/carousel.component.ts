import { AsyncPipe, NgFor, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { PhotoServiceService } from '../../photo-service.service';
import { map } from 'rxjs';

@Component({
  selector: 'new-carousel',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgOptimizedImage],
  templateUrl: './carousel.component.html',
})
export class CarouselComponent {
  photos;

  private prioritizedPhotos = 10;

  constructor(photoSevice: PhotoServiceService) {
    // add priority only to the first x photos
    this.photos = photoSevice
      .getPhotos()
      .pipe(
        map((urls) =>
          urls.map((url, index) => ({ url, hasPriority: index < this.prioritizedPhotos }))
        )
      );
  }
}
