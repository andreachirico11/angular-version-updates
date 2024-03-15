import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassicCompoComponent } from './classic-compo.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [ClassicCompoComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([{path: '', component: ClassicCompoComponent}])
  ]
})
export class ClassicModuleModule { }
