import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Angular Material Modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// App Routing
import { AppRoutingModule } from './app-routing.module';

// App Component (Root)
import { AppComponent } from './app.component';

// Navbar Component
import { NavbarComponent } from './Components/navbar/navbar.component';

// Receipt Dialog Component
// import { ReceiptDialogComponent } from './Components/receipt-dialog/receipt-dialog.component';

// Page Components (Booking Flow)
import { HomeComponent } from './pages/home/home.component';
import { FlightDetailsComponent } from './pages/flight-details/flight-details.component';
import { PreFlightComponent } from './pages/pre-flight/pre-flight.component';
// import { PostFlightComponent } from './pages/post-flight/post-flight.component';
// import { AncillariesComponent } from './pages/ancillaries/ancillaries.component';
// import { ConfirmationComponent } from './pages/confirmation/confirmation.component';

// Page Components (New: Auth & Static Pages)
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
  import { MatStepperModule } from '@angular/material/stepper';
// Services
import { ApiService } from './Services/api.service';
import { BookingService } from './Services/booking.service';
import { AuthService } from './Services/auth.service';
import { PostFlightComponent } from './pages/post-flight/post-flight.component';
import { AncillariesComponent } from './pages/ancillaries/ancillaries.component';
// import { ConfirmationComponent } from './pages/confirmation/confirmation.component';
import { ReceiptDialogComponent } from './Components/receipt-dialog/receipt-dialog.component';
import { StepperComponent } from './Components/stepper/stepper.component';
import { ConfirmationComponent } from './pages/confirmation/confirmation.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    // Root Component
    AppComponent,
    
    // Components
    NavbarComponent,
    // ReceiptDialogComponent,
    
    // Page Components (Booking Flow)
    HomeComponent,
    FlightDetailsComponent,
    StepperComponent,
    PreFlightComponent,
    PostFlightComponent,
    AncillariesComponent,
    ConfirmationComponent,
    
    // Page Components (Auth & Static)
    RegisterComponent,
    LoginComponent,
    AboutUsComponent,
    ContactUsComponent,
    ReceiptDialogComponent
  ],
  imports: [
    // Core Angular Modules
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    
    // Angular Material Modules
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatCheckboxModule,
    MatDialogModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatStepperModule,
    MatIconModule,
    
    // App Routing (includes all routes)
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [
    // Services are providedIn: 'root' in their files, so no need here
    ApiService,
    BookingService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }