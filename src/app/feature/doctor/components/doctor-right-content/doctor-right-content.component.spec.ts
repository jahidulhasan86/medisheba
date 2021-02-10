import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorRightContentComponent } from './doctor-right-content.component';

describe('DoctorRightContentComponent', () => {
  let component: DoctorRightContentComponent;
  let fixture: ComponentFixture<DoctorRightContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorRightContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorRightContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
