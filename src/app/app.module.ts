import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LocationComponent } from './location/location.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TermsComponent } from './terms/terms.component';
import { ContactusComponent } from './contactus/contactus.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';


@NgModule({
  declarations: [

    AppComponent,
    DashboardComponent,
    LocationComponent,
    HeaderComponent,
    FooterComponent,
    TermsComponent,
    ContactusComponent,
    ConfirmationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxQRCodeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
