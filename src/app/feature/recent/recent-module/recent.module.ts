import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecentRoutingModule } from './recent-routing.module';
import { RecentRightContentComponent } from '../components/recent-right-content/recent-right-content.component';


@NgModule({
  declarations: [RecentRightContentComponent],
  imports: [
    CommonModule,
    RecentRoutingModule
  ]
})
export class RecentModule { }
