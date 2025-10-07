import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';  // FIXED: Single import (essential for Material)
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// FIXED: Angular Material Modules (All Active & De-Duplicated)
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';  // FIXED: Single import (for mat-dialog-content/actions/title)
import { MatCardModule } from '@angular/material/card';      // For mat-card/content
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';      // FIXED: For mat-list/list-item
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';      // FIXED: For mat-icon (uncommented)
import { MatMenuModule } from '@angular/material/menu';      // FIXED: For navbar dropdown (uncommented)
import { MatToolbarModule } from '@angular/material/toolbar'; // FIXED: For any toolbars (added if needed)

// App Routing
import { AppRoutingModule } from './app-routing.module';

// App Component (Root)
import { AppComponent } from './app.component';

// Navbar Component
import { NavbarComponent } from './Components/navbar/navbar.component';

// FIXED: Dialog Components (Add Imports & Declarations)
import { ReceiptDialogComponent } from './Components/receipt-dialog/receipt-dialog.component';
import { NotificationsDialogComponent } from './Components/notification-dialog/notification-dialog.component';  // FIXED: Added import
// import { ProfileDialogComponent } from './Components/profile-dialog/profile-dialog.component';  // FIXED: Added import (note: singular 'component')

// Page Components (Booking Flow)
import { HomeComponent } from './pages/home/home.component';
import { FlightDetailsComponent } from './pages/flight-details/flight-details.component';
import { PreFlightComponent } from './pages/pre-flight/pre-flight.component';
import { PostFlightComponent } from './pages/post-flight/post-flight.component';
import { AncillariesComponent } from './pages/ancillaries/ancillaries.component';
import { ConfirmationComponent } from './pages/confirmation/confirmation.component';

// Page Components (Auth & Static Pages)
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';

// Other Components
import { StepperComponent } from './Components/stepper/stepper.component';

// Services (If not providedIn: 'root', keep here; otherwise remove to avoid duplicates)
import { ApiService } from './Services/api.service';
import { BookingService } from './Services/booking.service';
import { AuthService } from './Services/auth.service';
import { ProfileDialogComponent } from './Components/profile-dialog/profile-dialog.components';

@NgModule({
  declarations: [
    // Root Component
    AppComponent,
    
    // Components
    NavbarComponent,
    StepperComponent,
    ReceiptDialogComponent,
    
    // FIXED: Add Dialog Components Here (Critical for Template Compilation)
    NotificationsDialogComponent,  // FIXED: Now declared - resolves NG8001 for notifications-dialog
    ProfileDialogComponent,        // FIXED: Now declared - resolves NG8001 for profile-dialog
    
    // Page Components (Booking Flow)
    HomeComponent,
    FlightDetailsComponent,
    PreFlightComponent,
    PostFlightComponent,
    AncillariesComponent,
    ConfirmationComponent,
    
    // Page Components (Auth & Static)
    RegisterComponent,
    LoginComponent,
    AboutUsComponent,
    ContactUsComponent
  ],
  imports: [
    // Core Angular Modules
    BrowserModule,
    BrowserAnimationsModule,  // FIXED: Single instance (enables all Material animations)
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    
    // Angular Material Modules (De-Duplicated & Complete)
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatCheckboxModule,
    MatDialogModule,          // FIXED: Single - covers all dialog elements
    MatCardModule,            // FIXED: For profile cards
    MatProgressSpinnerModule,
    MatListModule,            // FIXED: Single - covers mat-list/list-item
    MatStepperModule,
    MatIconModule,            // FIXED: For icons in dialogs/navbar
    MatMenuModule,            // FIXED: For profile dropdown
    MatToolbarModule,         // FIXED: If using mat-toolbar in navbar
    
    // App Routing (includes all routes)
    AppRoutingModule
  ],
  providers: [
    // FIXED: Only if services are NOT providedIn: 'root' - check your service files
    // If they have @Injectable({ providedIn: 'root' }), remove these lines to avoid errors:
    // ApiService,
    // BookingService,
    // AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }