import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorRoutingModule } from './doctor-routing.module';
import { DoctorRightContentComponent } from '../components/doctor-right-content/doctor-right-content.component';


@NgModule({
  declarations: [DoctorRightContentComponent],
  imports: [
    CommonModule,
    DoctorRoutingModule
  ]
})
export class DoctorModule { }
