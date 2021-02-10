import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DoctorRightContentComponent } from '../components/doctor-right-content/doctor-right-content.component';


const routes: Routes = [
  {
    path: "", 
    component: DoctorRightContentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }
