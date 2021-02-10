import { Injectable } from '@angular/core';
import { GlobalValue } from '../../../../../app/global';
import { Observable, throwError, observable, BehaviorSubject } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  
  getDeptByHospitalIdURL: string = GlobalValue.medi_connect_url + '/dept';
  getAllBranchByHospitalIdUrl: string = GlobalValue.medi_connect_url + '/branch'
  getDoctorsByBranchAndDeptURL: string = `${GlobalValue.medi_connect_url}/doctor/getDoctorsByBranchDept`;

  constructor(private http: HttpClient) { }


  getDeptByHospitalId() {
    console.log("<========Get departments by hospital id Service called========>")

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: JSON.parse(localStorage.getItem('token'))
      })
    };

    return this.http.get(`${this.getDeptByHospitalIdURL}?hospital_id=${GlobalValue.hospital_id}`, httpOptions)
      .pipe(
        map((x: any) => x),
        catchError((error: Response) => {
          return throwError(error);
        })
      )
  }

  getAllBranchByHospitalId() {
    console.log("<========Get AllBranchByHospitalId Service Called========>")

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: JSON.parse(localStorage.getItem('token'))
      })
    };

    return this.http.get(this.getAllBranchByHospitalIdUrl + `?hospital_id=${GlobalValue.company_id}`, httpOptions)
      .pipe(
        map((x: Response) => x.json()),
        catchError((error: Response) => {
          return throwError(error);
        })
      )
  }

  getDoctorsByBranchAndDept(branch_id, dept_id?) {
    console.log("<========Get doctors by branch and dept. Service Called========>")

    let query
    if (dept_id) query = '?branch_id=' + branch_id + '&dept_id=' + dept_id
    else query = '?branch_id=' + branch_id

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: JSON.parse(localStorage.getItem('token'))
      })
    };

    return this.http.get(this.getDoctorsByBranchAndDeptURL + query, httpOptions)
      .pipe(
        map((x: any) => x),
        catchError((error: Response) => {
          return throwError(error);
        })
      )
  }

}
