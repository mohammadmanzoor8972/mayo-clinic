import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicianCapacityComponent } from './physician-capacity.component';

describe('PhysicianCapacityComponent', () => {
  let component: PhysicianCapacityComponent;
  let fixture: ComponentFixture<PhysicianCapacityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhysicianCapacityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysicianCapacityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
