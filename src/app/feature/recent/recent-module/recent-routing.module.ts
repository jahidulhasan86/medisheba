import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecentRightContentComponent } from '../components/recent-right-content/recent-right-content.component';


const routes: Routes = [
  {
    path: "", 
    component: RecentRightContentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecentRoutingModule { }
