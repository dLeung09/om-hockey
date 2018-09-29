import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerStatsComponent } from './career-stats.component';

describe('CareerStatsComponent', () => {
  let component: CareerStatsComponent;
  let fixture: ComponentFixture<CareerStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CareerStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CareerStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
