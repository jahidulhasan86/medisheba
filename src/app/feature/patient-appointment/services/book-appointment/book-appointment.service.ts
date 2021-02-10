import { Injectable } from '@angular/core';
import { GlobalValue } from '../../../../../app/global';
import { Observable, throwError, observable, BehaviorSubject, of } from 'rxjs';
import { map, catchError, tap, concatMap, mergeMap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookAppointmentService {
  createAppointmentsURL: string = GlobalValue.medi_connect_url + '/appointments';
  private addConferenceURL = GlobalValue.video_hub_Service_Url + '/conference/addConference';

  constructor(private http: HttpClient) { }

  createAppointment(doctor, date) {
    const { user_name, id } = JSON.parse(localStorage.getItem('sessionUser'))
    let createAppointmentModel = {
      doctor_id: doctor.user_id,
      patient_id: id,
      hospital_id: doctor.hospital_id,
      branch_id: doctor.branch_id,
      appointment_type: "regular",
      s_no: "1", // serial no auto increment and check against max patients of a doctor and add bill_amount 
      date: date ? new Date(date).getTime().toString() : '',
      bill_amount: "1000",
      bill_status: "paid", // status=pending|paid
      doctor_name: doctor.user_name,
      patient_name: user_name
    }

    console.log(createAppointmentModel)

    if (!createAppointmentModel.date) return throwError({ error: 'Validation error', message: 'Please select appointment date' })

    console.log("<========Create appointment Service Called========>")

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: JSON.parse(localStorage.getItem('token'))
      })
    };

    return this.http.post(this.createAppointmentsURL, createAppointmentModel, httpOptions)
      .pipe(
        map((x: any) => x),
        map((x: any) => x.result),
        concatMap((x) => {
          return of(x).pipe(
            mergeMap((x) => {

              const addConferenceBody = {
                // conference_id: x.appointment_id,
                conference_name: x.doctor_name + '_to_' + x.patient_name,
                users: [{ user_id: x.doctor_id, user_name: x.doctor_name }, { user_id: x.patient_id, user_name: x.patient_name }],
                region: '',
                conference_type: '2',
                is_pinned: false,
                is_allow_contributor: false,
                geofences: null,
                tags: 'my_group'
              }

              console.log('<========Add conference service called========>');
              return this.http.post(this.addConferenceURL, addConferenceBody, httpOptions).pipe(
                map((x: any) => x),
              );
            })
          );
        }),
        catchError((error: Response) => {
          return throwError(error);
        })
      )
  }
}
