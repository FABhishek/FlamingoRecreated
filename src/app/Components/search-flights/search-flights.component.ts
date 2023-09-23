import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CheckSeatLimit, dateValidatorDepart, dateValidatorReturn } from 'src/app/shared/flightDetailValidator';

@Component({
  selector: 'app-search-flights-component',
  templateUrl: './search-flights.component.html',
  styleUrls: ['./search-flights.component.scss']
})
export class DetailsComponentComponent implements OnInit {

  searchFlightForm!: FormGroup;
  submitted: boolean = false;

  activeTab: string = 'one-way';

  model = {
    roundTrip: '',
  };

  isDateRequired: boolean = true;

 
 
  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) { 
    const person = {
      firstName: "John",
      lastName: "Doe",
      age: 30,
      email: "john@example.com",
    };
    
    // Remove the 'age' field
    const { age, lastName, ...newPerson } = person;

    console.log(newPerson);
  }

  ngOnInit(): void {
    this.searchFlightForm = this.fb.group({
      origin: [null, [Validators.required,Validators.minLength(3)]],
      destination: [null, [Validators.required,Validators.minLength(3)]],
      departureDate: [null, [Validators.required, dateValidatorDepart]],
      returnDate: [null, [ dateValidatorReturn]],
      passenger: [1, [Validators.required]]
    },
      {
        validators: [CheckSeatLimit("passenger"), dateValidatorDepart("departureDate"), dateValidatorReturn("returnDate", "departureDate")]

      },

    );
  }

  activateTab(tabName: string) {
    this.activeTab = tabName;
    if (this.activeTab == 'round-trip') {
      this.isDateRequired = true;
    } else {
      this.isDateRequired = false;
      this.searchFlightForm.get('returnDate')?.patchValue(null);
    }

    this.cdr.detectChanges();
  }
  
  onSubmit() {
    this.submitted = true;
    console.log(this.searchFlightForm.value);
  }

  get f(): { [controlName: string]: AbstractControl } { //getter 
    return this.searchFlightForm.controls;
  }
}