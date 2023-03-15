import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FireBaseServiceService } from '../fire-base-service.service';
import { TripsService } from '../trips.service';
import { Trip } from '../trips/trips.component';


@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.css']
})
export class AddTripComponent implements OnInit {

  constructor(private tripsservice: TripsService, private fb : FireBaseServiceService){

  }
  modelForm!: FormGroup;
  maxId! : number;
  ngOnInit(): void {
    this.maxId = this.tripsservice.trips.length;
    this.modelForm = new FormGroup({
      Name: new FormControl(
        '',
        Validators.required

      ),
      Country: new FormControl(
        '',
        Validators.required
      ),
      Start: new FormControl(
        '',
        Validators.required
      ),
      End: new FormControl(
        '',
        Validators.required
      ),
      Price: new FormControl([
        '',
        Validators.required,
        Validators.pattern('[0-9]+')]
      ),
      Amount: new FormControl([0,
    
        Validators.required,
        Validators.pattern('[0-9]+')]
      ),
      Image: new FormControl(
        '',
        Validators.required
      ),
      Description: new FormControl(
        '',
        Validators.required
      )
    });

  }
  submitForm(){
    let newlyCreatedTrip = {
      Id : this.maxId,
      Name : this.modelForm.get('Name')!.value,
      Country : this.modelForm.get('Country')!.value,
      Start : this.modelForm.get('Start')!.value,
      End : this.modelForm.get('End')!.value,
      Price : this.modelForm.get('Price')!.value,
      Amount : this.modelForm.get('Amount')!.value,
      Image : this.modelForm.get('Image')!.value,
      Description : this.modelForm.get('Description')!.value,
      Rating : 0
    } as Trip
    this.fb.addTrip(newlyCreatedTrip, this.maxId + ''); 
    this.maxId += 1;
  }
  
}




