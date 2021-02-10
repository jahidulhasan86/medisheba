import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';
import { PatientGuard } from './feature/patient-appointment/auth/patient.guard';
import { DoctorGuard } from './feature/doctor-appointment/auth/doctor.guard';

// import { HomeComponent } from './home/home.component';
import { VideoRoomComponent } from './video-room/video-room.component';
import { HomeNavbarComponent } from './components/home-navbar/home-navbar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SigninComponent } from './core/components/signin/signin.component';


let lsValue = localStorage.getItem("sessionUser");

const routes: Routes = [
    { path: '', redirectTo: lsValue ? '/home' : '/Signin', pathMatch: 'full' },

    { path: 'Signin', component: SigninComponent, pathMatch: 'full' },

    { path: 'home', component: HomeNavbarComponent, canActivate: [AuthGuard], pathMatch: 'full' },

    { path: 'call/:roomName', component: VideoRoomComponent },

    { path: 'dashboard', loadChildren: () => import('./core/components/setup/setup-module/setup.module').then(m => m.SetupModule) },

    { path: 'recent', loadChildren: () => import('./feature/recent/recent-module/recent.module').then(m => m.RecentModule) },

    { path: 'doctor', loadChildren: () => import('./feature/doctor/doctor-module/doctor.module').then(m => m.DoctorModule) },

    { path: 'doctor-appointment', canLoad: [DoctorGuard], loadChildren: () => import('./feature/doctor-appointment/doctor-appointment-module/doctor-appointment.module').then(m => m.DoctorAppointmentModule) },

    { path: 'patient-appointment', canLoad: [PatientGuard], loadChildren: () => import('./feature/patient-appointment/patient-appointment-module/patient-appointment.module').then(m => m.PatientAppointmentModule) },

    { path: '**', component: NotFoundComponent, pathMatch: 'full' },
]

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
