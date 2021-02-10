import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { BookAppointmentService } from '../../services/book-appointment/book-appointment.service';
import Swal from 'sweetalert2';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.css']
})
export class BookAppointmentComponent implements OnInit {
  selectedDate: any;
  // datas: any = ["2020-06-22", "2020-06-25"];

  // @ViewChild('calendar') calendar: MatCalendar<Date>;

  constructor(private dialogRef: MatDialogRef<BookAppointmentComponent>, @Inject(MAT_DIALOG_DATA) private data: any, private bookAppointService: BookAppointmentService) { }

  ngOnInit() {
    console.log(this.data)
  }

  datePickerEvent(e) {
    this.selectedDate = e
    console.log(this.selectedDate)
    // console.log(new Date(this.selectedDate).toLocaleDateString())
  }

  createAppointment() {
    this.bookAppointService.createAppointment(this.data.doctor, this.selectedDate).subscribe((result) => {
      if (result.status == 'ok') {
        console.log(result)
        this.selectedDate = ''
        this.errorSuccessMsgHandler(result)
        this.closeDialoge()
      }
    }, err => {
      console.log(err)
      this.errorSuccessMsgHandler(err)
    })
  }

  errorSuccessMsgHandler(status) {
    Swal({
      title: (status.error == 'Validation error' && !status.code) ? status.message
        : status.code == 500 ? 'Required field missing.' : ((status.code == 200 && status.status == 'ok') || (status.status == 'ok')) ? 'Appointment booked.' : 'Error! Server not found.',
      timer: 2000,
      type: ((status.code == 200 && status.status == 'ok') || (status.status == 'ok')) ? 'success' : 'warning',
      showConfirmButton: false
    });
  }

  closeDialoge(){
    this.dialogRef.close()
  }

  dateClass() {
    return (date: Date): MatCalendarCellCssClasses => {
      const highlightDate = this.data.schedules.map(schedule => new Date(schedule))
        .some(d => d.getDate() === date.getDate() && d.getMonth() === date.getMonth() && d.getFullYear() === date.getFullYear());
      return highlightDate ? 'doctor-schedule' : '';
    };
  }

}
