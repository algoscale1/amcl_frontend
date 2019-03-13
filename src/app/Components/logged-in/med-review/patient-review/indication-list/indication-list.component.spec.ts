import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicationListComponent } from './indication-list.component';

describe('IndicationListComponent', () => {
  let component: IndicationListComponent;
  let fixture: ComponentFixture<IndicationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndicationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
