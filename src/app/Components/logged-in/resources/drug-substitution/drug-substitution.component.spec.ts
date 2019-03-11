import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugSubstitutionComponent } from './drug-substitution.component';

describe('DrugSubstitutionComponent', () => {
  let component: DrugSubstitutionComponent;
  let fixture: ComponentFixture<DrugSubstitutionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrugSubstitutionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugSubstitutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
