import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorAppointmentRightContentComponent } from './doctor-appointment-right-content.component';

describe('DoctorAppointmentRightContentComponent', () => {
  let component: DoctorAppointmentRightContentComponent;
  let fixture: ComponentFixture<DoctorAppointmentRightContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorAppointmentRightContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorAppointmentRightContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
