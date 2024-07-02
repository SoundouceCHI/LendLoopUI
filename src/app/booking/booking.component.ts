import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoansService } from '../services/loans.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule, DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { NativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [FormsModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
  providers: [
    { provide: DateAdapter, useClass: NativeDateAdapter },
    { provide: MAT_DATE_LOCALE, useValue: 'en-US' }
  ]
})
export class BookingComponent {
  itemId: number=0; 
  dates: any[] = []; 
  unavailableDates: Date[] = []; 

  constructor(private loanService: LoansService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.itemId = +params['id']; 
      this.loadDates(); 
    });
  }

  loadDates() {
    if (this.itemId) {
      this.loanService.getUnavailableDatesByItem(this.itemId).subscribe(data => {
        this.dates = data;
        this.processDates();
      }, error => {
        console.log("Error: ", error);
      });
    } else {
      console.log("Item ID is undefined.");
    }
  }
  
  processDates() {
    this.dates.forEach(period => {
      if (period.startDate && period.endDate) {
        let currentDate = new Date(period.startDate);
        while (currentDate <= new Date(period.endDate)) {
          if (!this.unavailableDates.some(d =>
              d.getDate() === currentDate.getDate() &&
              d.getMonth() === currentDate.getMonth() &&
              d.getFullYear() === currentDate.getFullYear())) {
            this.unavailableDates.push(new Date(currentDate));
          }
          currentDate.setDate(currentDate.getDate() + 1);
        }
      }
    });
  }

  dateClass = (date: Date | null): boolean => {
    if (!date) return true;  
  
    const dateExists = this.unavailableDates.some(d =>
      d.getDate() === date.getDate() &&
      d.getMonth() === date.getMonth() &&
      d.getFullYear() === date.getFullYear()
    );
  
    return !dateExists; 
  }
  
}
