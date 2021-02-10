import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientAppointmentRightContentComponent } from './patient-appointment-right-content.component';

describe('PatientAppointmentRightContentComponent', () => {
  let component: PatientAppointmentRightContentComponent;
  let fixture: ComponentFixture<PatientAppointmentRightContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientAppointmentRightContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientAppointmentRightContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
