import { Component, OnInit, Input, SimpleChange } from '@angular/core';
import { DepartmentService } from '../../services/department/department.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';

import { BookAppointmentComponent } from '../book-appointment/book-appointment.component';
import { DoctorScheduleService } from '../../services/doctor-schedule/doctor-schedule.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  doctors = []
  @Input() department: any

  constructor(private deptService: DepartmentService, private dialog: MatDialog, private doctorSchedule: DoctorScheduleService) { }

  ngOnChanges(changes: SimpleChange) {
    this.doctors = []
    if (this.department != undefined) {
      this.getDoctorsByBranchAndDept(this.department)
    }
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  getDoctorsByBranchAndDept(department) {
    this.deptService.getDoctorsByBranchAndDept('b0f33f00-a4c7-11ea-96f1-6d2c86545d91', department.id).subscribe(result => {
      if (result.status == 'ok') {
        this.doctors = result.resultset
        console.log('getDoctorsByBranchAndDept', this.doctors)
      }
    }, err => {
      console.log(err)
      this.errorHandler(err)
    })
  }

  errorHandler(err) {
    Swal({
      title: "Error! Server not found.",
      timer: 3000,
      type: 'warning'
    });
  }

  async bookAppointmentModal(doctor) {
    await this.getDoctorSchedule().then((schedules) => {
      console.log(schedules)
      if (schedules) {
        this.dialog.open(BookAppointmentComponent, {
          panelClass: 'book-appointment-modal',
          width: '27%',
          data: {
            doctor: doctor,
            schedules: schedules
          }
        });
      }
    })
  }

  async getDoctorSchedule() {
    return this.doctorSchedule.geDoctorSchedule().toPromise()
  }

}
