import { AsyncPipe, NgFor, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { PhotoServiceService } from '../../photo-service.service';
import { map } from 'rxjs';

@Component({
  selector: 'old-carousel',
  standalone: true,
  imports: [AsyncPipe, NgFor],
  templateUrl: './carousel.component.html',
})
export class CarouselComponent {
  photos;

  constructor(photoSevice: PhotoServiceService) {
    this.photos = photoSevice
      .getPhotos()

  }
}
