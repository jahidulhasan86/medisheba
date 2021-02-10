import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DoctorAppointmentRightContentComponent } from '../components/doctor-appointment-right-content/doctor-appointment-right-content.component';
import { DoctorGuard } from '../auth/doctor.guard';


const routes: Routes = [
  {
    path: "",
    component: DoctorAppointmentRightContentComponent,
    pathMatch: 'full',
    canActivate: [DoctorGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorAppointmentRoutingModule { }
