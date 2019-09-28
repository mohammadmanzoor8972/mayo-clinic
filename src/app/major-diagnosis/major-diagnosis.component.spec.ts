import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MajorDiagnosisComponent } from './major-diagnosis.component';

describe('MajorDiagnosisComponent', () => {
  let component: MajorDiagnosisComponent;
  let fixture: ComponentFixture<MajorDiagnosisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MajorDiagnosisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MajorDiagnosisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
