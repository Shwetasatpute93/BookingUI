import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LocationComponent } from './location/location.component';

const routes: Routes = [
  {
    path:'',
    component: DashboardComponent,
    
  },
  {
    path:'dashboard',
    component: DashboardComponent
  },
  {
    path:'location',
    component: LocationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
