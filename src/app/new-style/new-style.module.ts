import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NewCompoComponent } from './new-compo.component';

@NgModule({
  declarations: [NewCompoComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: "", component: NewCompoComponent}])
  ]
})
export class NewStyleModule { }
