import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurgicalDurationComponent } from './surgical-duration.component';

describe('SurgicalDurationComponent', () => {
  let component: SurgicalDurationComponent;
  let fixture: ComponentFixture<SurgicalDurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurgicalDurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurgicalDurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
