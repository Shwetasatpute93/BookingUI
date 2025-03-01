import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LocationComponent } from './location/location.component';
import { TermsComponent } from './terms/terms.component';
import { ContactusComponent } from './contactus/contactus.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';

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
  },
  {
    path:'terms',
    component: TermsComponent
  },
  {
    path:'contact',
    component: ContactusComponent
  },
  {
    path:'confirmation',
    component: ConfirmationComponent
  },
  {
    path:'**',
    component: DashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
