import { NgModule } from '@angular/core';
import { TestService } from '../test.service';
import { AnotherCompComponent } from '../another-comp/another-comp.component';



@NgModule({
  declarations: [AnotherCompComponent],
  exports: [AnotherCompComponent],
  providers: [
    TestService
  ]
})
export class SharedModule { }
