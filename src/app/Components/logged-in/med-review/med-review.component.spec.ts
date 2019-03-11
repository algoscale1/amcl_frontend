import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedReviewComponent } from './med-review.component';

describe('MedReviewComponent', () => {
  let component: MedReviewComponent;
  let fixture: ComponentFixture<MedReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
