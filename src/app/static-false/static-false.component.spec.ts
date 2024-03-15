import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticFalseComponent } from './static-false.component';

describe('StaticFalseComponent', () => {
  let component: StaticFalseComponent;
  let fixture: ComponentFixture<StaticFalseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaticFalseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticFalseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
