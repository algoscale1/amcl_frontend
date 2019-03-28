import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplemetsComponent } from './supplemets.component';

describe('SupplemetsComponent', () => {
  let component: SupplemetsComponent;
  let fixture: ComponentFixture<SupplemetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplemetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplemetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
