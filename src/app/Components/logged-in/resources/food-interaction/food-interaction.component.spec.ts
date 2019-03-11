import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodInteractionComponent } from './food-interaction.component';

describe('FoodInteractionComponent', () => {
  let component: FoodInteractionComponent;
  let fixture: ComponentFixture<FoodInteractionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodInteractionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodInteractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
