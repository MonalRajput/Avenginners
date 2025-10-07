import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../Services/api.service';
import { BookingService } from '../../Services/booking.service';
import { Ancillary } from '../../Models/booking.model';

@Component({
  selector: 'app-ancillaries',
  templateUrl: './ancillaries.component.html',
  // styleUrls: ['./ancillaries.component.scss']
})
export class AncillariesComponent implements OnInit {
  ancillaries: Ancillary[] = [];
  isLoading = false;
  selectedAncillaries: Ancillary[] = [];
  ancillaryTotal = 0;

  constructor(
    private api: ApiService,
    private bookingService: BookingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.api.getAncillaries().subscribe(
      (ancillaries: Ancillary[]) => {
        this.ancillaries = ancillaries;
        this.isLoading = false;
        console.log('Ancillaries loaded:', ancillaries);

        // Pre-select from booking if any
        const booking = this.bookingService.getBooking();
        if (booking.ancillaries) {
          this.ancillaries.forEach(a => {
            if (booking.ancillaries?.includes(a.name)) {
              a.selected = true;
              this.toggleAncillary(a);
            }
          });
        }
      },
      (error) => {
        console.error('Error loading ancillaries:', error);
        this.isLoading = false;
      }
    );
  }

  toggleAncillary(ancillary: Ancillary): void {
    ancillary.selected = !ancillary.selected;
    this.updateSelected();
  }

  updateSelected(): void {
    this.selectedAncillaries = this.ancillaries.filter(a => a.selected);
    this.ancillaryTotal = this.selectedAncillaries.reduce((sum, a) => sum + a.price, 0);
    console.log('Selected ancillaries total:', this.ancillaryTotal);

    // Update booking with selected names and total
    this.bookingService.updateBooking({
      ancillaries: this.selectedAncillaries.map(a => a.name),
      ancillaryPrice: this.ancillaryTotal  // Optional: Add to models if needed
    });
  }

  onContinue(): void {
    console.log('Ancillaries finalized:', this.selectedAncillaries);
    this.router.navigate(['/confirmation']);  // Next: Review & Pay
  }
}