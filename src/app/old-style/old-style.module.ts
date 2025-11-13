import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OldCompoComponent } from './old-compo.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [OldCompoComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: "", component: OldCompoComponent}])
  ]
})
export class OldStyleModule { }
