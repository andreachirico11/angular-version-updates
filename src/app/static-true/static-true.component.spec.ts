import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticTrueComponent } from './static-true.component';

describe('StaticTrueComponent', () => {
  let component: StaticTrueComponent;
  let fixture: ComponentFixture<StaticTrueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaticTrueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticTrueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
