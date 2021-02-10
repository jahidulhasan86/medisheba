import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';
import { DepartmentService } from '../../services/department/department.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  public config: PaginationInstance = {
    id: 'custom',
    itemsPerPage: 4,
    currentPage: 1
  };
  departments = []
  @Output() selectedDeptEEmitter = new EventEmitter<any>()

  constructor(private deptService: DepartmentService) { }

  ngOnInit() {
    this.getDeptByHospitalId()
  }

  ngAfterViewInit() {
  }

  mouseover(e, department) {
    document.getElementById(`department-name_${department.id}`).style.color = 'white'
    document.getElementById(`static-dept_${department.id}`).style.color = 'white'
    const dept_btn = document.getElementById(`department-detatils-btn_${department.id}`)
    if (!!dept_btn) {
      dept_btn.style.backgroundImage = 'linear-gradient(to bottom, #ffffff, #ffffff)'
      dept_btn.style.color = '#707070'
    }
  }

  mouseOut(e, department) {
    document.getElementById(`department-name_${department.id}`).style.color = '#60c5bf'
    document.getElementById(`static-dept_${department.id}`).style.color = '#515c6f'
    document.getElementById(`department-detatils-btn_${department.id}`).style.backgroundImage = 'linear-gradient(to bottom, #f5cf1f, #f49823)'

    const dept_btn = document.getElementById(`department-detatils-btn_${department.id}`)
    if (!!dept_btn) {
      dept_btn.style.backgroundImage = 'linear-gradient(to bottom, #f5cf1f, #f49823)'
      dept_btn.style.color = 'white'
    }
  }

  getDeptByHospitalId() {
    this.deptService.getDeptByHospitalId().subscribe((result) => {
      if (result.status == 'ok') {
        this.departments = result.resultset
        console.log('getDeptByHospitalId', this.departments)
      }
    }, err => {
      console.log(err)
      this.errorHandler(err)
    })
  }

  errorHandler(err){
    Swal({
      title: "Error! Server not found.",
      timer: 3000,
      type: 'warning'
    });
  }

  getDoctorsByBranchAndDept(department){
    this.selectedDeptEEmitter.emit(department)
  }

}
