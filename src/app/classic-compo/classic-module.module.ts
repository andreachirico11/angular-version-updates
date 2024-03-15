import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassicCompoComponent } from './classic-compo.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [ClassicCompoComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: ClassicCompoComponent}])
  ]
})
export class ClassicModuleModule { }
