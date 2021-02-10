import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientAppointmentRightContentComponent } from '../components/patient-appointment-right-content/patient-appointment-right-content.component';
import { PatientGuard } from '../auth/patient.guard';
import { DepartmentsDoctorsComponent } from '../components/departments-doctors/departments-doctors.component';


const routes: Routes = [
  {
    path: "",
    component: PatientAppointmentRightContentComponent,
    canActivate: [PatientGuard],
    pathMatch: 'full'
  },
  {
    path: "schedule/departments",
    component: DepartmentsDoctorsComponent,
    canActivate: [PatientGuard],
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientAppointmentRoutingModule { }
