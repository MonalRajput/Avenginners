import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import All Page Components
import { HomeComponent } from './pages/home/home.component';
import { FlightDetailsComponent } from './pages/flight-details/flight-details.component';
import { PreFlightComponent } from './pages/pre-flight/pre-flight.component';
// import { PostFlightComponent } from './pages/post-flight/post-flight.component';
// import { AncillariesComponent } from './pages/ancillaries/ancillaries.component';
// import { ConfirmationComponent } from './pages/confirmation/confirmation.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { PostFlightComponent } from './pages/post-flight/post-flight.component';
import { AncillariesComponent } from './pages/ancillaries/ancillaries.component';
import { StepperComponent } from './Components/stepper/stepper.component';
import { ConfirmationComponent } from './pages/confirmation/confirmation.component';
import { ReceiptDialogComponent } from './Components/receipt-dialog/receipt-dialog.component';

const routes: Routes = [
  // Home (Default)
  {path: '', component: StepperComponent},
  { path: '', component: HomeComponent },
  
  
  // Static Pages
  { path: 'about-us', component: AboutUsComponent },
  { path: 'contact-us', component: ContactUsComponent },
  
  // Auth Pages
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  
  // Booking Flow (Protected? - Add guards later if needed)
  //  { path: 'booking', component: StepperComponent },
  { path: 'flight-details/:flightId', component: FlightDetailsComponent },
  { path: 'pre-flight', component: PreFlightComponent },
  { path: 'post-flight', component: PostFlightComponent },
  { path: 'ancillaries', component: AncillariesComponent },
  { path: 'confirmation', component: ConfirmationComponent },
  {path: 'receipt-dialog', component: ReceiptDialogComponent},
  
  // Wildcard (404 Redirect)
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }