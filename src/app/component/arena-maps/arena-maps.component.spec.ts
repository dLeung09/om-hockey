import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArenaMapsComponent } from './arena-maps.component';

describe('ArenaMapsComponent', () => {
  let component: ArenaMapsComponent;
  let fixture: ComponentFixture<ArenaMapsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArenaMapsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArenaMapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
