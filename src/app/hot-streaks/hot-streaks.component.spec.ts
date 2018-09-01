import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotStreaksComponent } from './hot-streaks.component';

describe('HotStreaksComponent', () => {
  let component: HotStreaksComponent;
  let fixture: ComponentFixture<HotStreaksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotStreaksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotStreaksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
