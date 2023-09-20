import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-details-component',
  templateUrl: './details-component.component.html',
  styleUrls: ['./details-component.component.scss']
})
export class DetailsComponentComponent implements OnInit {

  activeTab = 'one-way';

  activateTab(tabName: string) {
    this.activeTab = tabName;
  }

  registerForm!: FormGroup;
  submitted: boolean = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      origin: [null, [Validators.required]],
      destination: [null, [Validators.required]],
      departureDate: [null, [Validators.required, this.dateValidatorDepart]],
      returnDate: [null, [Validators.required]],
      passenger: [0, [Validators.required]]
    },
      {
        validators: [this.CheckSeatLimit("passenger"), this.dateValidatorDepart("departureDate"), this.dateValidatorReturn("returnDate")]

      },

    );
  }

  CheckSeatLimit(controlName: string) {
    return (fg: FormGroup) => {
      const control = fg.controls[controlName];
      try {
        if (control.errors && !control.errors['notmatched']) {
          return;
        }
        if (control.value <= 0 || control.value > 5) {
          control.setErrors({ notmatched: true });
        }
        else {
          control.setErrors(null);
        }
      }
      catch (error: any) {
        const stackTraceError: any = new Error('Invalid no. of seats passed');
        stackTraceError.stack = error.stack;
        console.error('Seats Invalid:', stackTraceError);
      }
    }

  }

  dateValidatorDepart(controlName: string) {
    return (fg: FormGroup) => {
      const control = fg.controls[controlName];

      try {
        if (control.errors && !control.errors['invalidDate']) {
          return;
        }

        let ifSelected: String = control.value;

        if (ifSelected === null) return
        let input = ifSelected.split("-");
        let date = Number(input[2]);
        let year = Number(input[0]);
        let month = Number(input[1]);

        let currentYear = new Date().getFullYear();
        let currentMonth = new Date().getMonth() + 1;
        let currentDate = new Date().getDate();

        if (date < currentDate && month <= currentMonth && year <= currentYear) {
          control.setErrors({ invalidDate: true });
        }
        else {
          control.setErrors(null);
        }
      }
      catch (error: any) {
        const stackTraceError: any = new Error('Date parsing error');
        stackTraceError.stack = error.stack;
        console.error('Date parsing error:', stackTraceError);
      }
    }
  }


  dateValidatorReturn(controlName: string,) {
    return (fg: FormGroup) => {
      const control = fg.controls[controlName];

      try {
        if (control.errors && !control.errors['invalidDate'] && !control.errors['matchedWithDepartDate']) {
          return;
        }

        let ifSelected: String = control.value;

        if (ifSelected === null) return
        let input = ifSelected.split("-");
        let date = Number(input[2]);
        let year = Number(input[0]);
        let month = Number(input[1]);

        let currentYear = new Date().getFullYear();
        let currentMonth = new Date().getMonth() + 1;
        let currentDate = new Date().getDate();

        let departure = this.registerForm.value.departureDate
        if (departure === null)
          return;

        departure = departure.split('-');
        let departDate = Number(departure[2]);

        if (date >= currentDate && month >= currentMonth && year >= currentYear) {
          if (date <= departDate) {
            control.setErrors({ matchedWithDepartDate: true });
          }
          else {
            control.setErrors(null);
          }
        }

        else {
          control.setErrors({ invalidDate: true });
        }
      }
      catch (error: any) {
        const stackTraceError: any = new Error('Date parsing error');
        stackTraceError.stack = error.stack;
        console.error('Date parsing error:', stackTraceError);
      }
    }
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.registerForm.value);
  }

  get f(): { [controlName: string]: AbstractControl } { //getter 
    return this.registerForm.controls;
  }
}