import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientAppointmentRoutingModule } from './patient-appointment-routing.module';
import { PatientAppointmentRightContentComponent } from '../components/patient-appointment-right-content/patient-appointment-right-content.component';
import { DepartmentsDoctorsComponent } from '../components/departments-doctors/departments-doctors.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatBadgeModule } from '@angular/material/badge';
import { MatStepperModule } from '@angular/material/stepper';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HttpClientModule } from '@angular/common/http';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { DepartmentComponent } from '../components/department/department.component';
import { DoctorComponent } from '../components/doctor/doctor.component';
import { BookAppointmentComponent } from '../components/book-appointment/book-appointment.component';
import { DepartmentService } from '../services/department/department.service';
import { BookAppointmentService } from '../services/book-appointment/book-appointment.service';


@NgModule({
  declarations: [PatientAppointmentRightContentComponent, DepartmentsDoctorsComponent, DepartmentComponent, DoctorComponent, BookAppointmentComponent],
  imports: [
    CommonModule,
    PatientAppointmentRoutingModule,

    NgxPaginationModule,
    MatTooltipModule,
    MatAutocompleteModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    LayoutModule,
    FormsModule,
    MatMenuModule,
    MatProgressBarModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatBadgeModule,
    MatStepperModule,
    MatProgressSpinnerModule,
    // FilterPipeModule,
    MatTabsModule,
    MatSelectModule,
    MatRadioModule,
    MatGridListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    // ChartsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    HttpClientModule,
    NgxMaterialTimepickerModule
  ],
  providers: [DepartmentService, BookAppointmentService],
  entryComponents: [BookAppointmentComponent]
})
export class PatientAppointmentModule { }
