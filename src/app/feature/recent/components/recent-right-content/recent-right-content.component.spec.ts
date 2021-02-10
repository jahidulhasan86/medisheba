import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentRightContentComponent } from './recent-right-content.component';

describe('RecentRightContentComponent', () => {
  let component: RecentRightContentComponent;
  let fixture: ComponentFixture<RecentRightContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentRightContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentRightContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
