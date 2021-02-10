import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-departments-doctors',
  templateUrl: './departments-doctors.component.html',
  styleUrls: ['./departments-doctors.component.css']
})
export class DepartmentsDoctorsComponent implements OnInit {
  department: any;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  getDoctorsByBranchAndDept(event){
    this.department = event
  }

}
