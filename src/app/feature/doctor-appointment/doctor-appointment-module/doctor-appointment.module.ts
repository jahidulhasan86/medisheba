import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorAppointmentRoutingModule } from './doctor-appointment-routing.module';
import { DoctorAppointmentRightContentComponent } from '../components/doctor-appointment-right-content/doctor-appointment-right-content.component';


@NgModule({
  declarations: [DoctorAppointmentRightContentComponent],
  imports: [
    CommonModule,
    DoctorAppointmentRoutingModule
  ]
})
export class DoctorAppointmentModule { }
