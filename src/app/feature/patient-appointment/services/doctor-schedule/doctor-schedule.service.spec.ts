import { TestBed, inject } from '@angular/core/testing';

import { DoctorScheduleService } from './doctor-schedule.service';

describe('DoctorScheduleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DoctorScheduleService]
    });
  });

  it('should be created', inject([DoctorScheduleService], (service: DoctorScheduleService) => {
    expect(service).toBeTruthy();
  }));
});
