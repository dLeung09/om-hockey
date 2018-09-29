import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalieStatsComponent } from './goalie-stats.component';

describe('GoalieStatsComponent', () => {
  let component: GoalieStatsComponent;
  let fixture: ComponentFixture<GoalieStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoalieStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalieStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
