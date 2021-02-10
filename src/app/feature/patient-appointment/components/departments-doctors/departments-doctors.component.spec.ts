import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentsDoctorsComponent } from './departments-doctors.component';

describe('DepartmentsDoctorsComponent', () => {
  let component: DepartmentsDoctorsComponent;
  let fixture: ComponentFixture<DepartmentsDoctorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmentsDoctorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentsDoctorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
