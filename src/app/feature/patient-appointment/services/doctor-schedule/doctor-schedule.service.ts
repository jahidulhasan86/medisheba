import { Injectable } from '@angular/core';
import { GlobalValue } from '../../../../../app/global';
import { Observable, throwError, observable, BehaviorSubject, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DoctorScheduleService {

  constructor() { }

  geDoctorSchedule(){
    return of(["2020-06-01", "2020-06-05", "2020-06-10", "2020-06-22", "2020-06-25", "2020-06-28"])
  }
}
