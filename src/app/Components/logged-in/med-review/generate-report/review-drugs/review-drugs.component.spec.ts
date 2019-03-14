import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewDrugsComponent } from './review-drugs.component';

describe('ReviewDrugsComponent', () => {
  let component: ReviewDrugsComponent;
  let fixture: ComponentFixture<ReviewDrugsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewDrugsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewDrugsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
