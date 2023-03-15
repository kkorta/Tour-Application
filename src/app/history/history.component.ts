import { Component, OnInit } from '@angular/core';
import { TripsService } from '../trips.service';
import { Trip } from '../trips/trips.component';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  constructor(private tripsservice : TripsService) { }
  boughtTrips = this.tripsservice.getBoughtTrips()
  filters = ["wszystkie", "aktywna", "archiwalna", "w trakcie"];
  selectedFilter = "wszystkie";
  rate = this.tripsservice.rate;
  currency = this.tripsservice.currency;

  ngOnInit(): void {

  }
  chosenFilter(){

  }
  checkDate() : string{
    let newd  = new Date();
    let year = newd.getFullYear();
    let month = newd.getMonth() + 1;
    let day = newd.getDate();
  
    if (day.toString().length == 1 && month.toString().length == 1){
      return year + "-0" + month + "-0" + day;
    }
    if (month.toString().length == 1){
      return year + "-0" + month + "-" + day;
    }
    if (day.toString().length == 1){
      return year + "-" + month + "-0" + day;
    }

    return year + "-" + month + "-" + day;
  }


  checkFilter( trip : Trip) : boolean{
    if (this.selectedFilter == "aktywna"){
      return this.checkDate() < trip.Start;
    }
    if (this.selectedFilter == "archiwalna"){
      return this.checkDate() > trip.End;
    }
    if (this.selectedFilter == "w trakcie"){
      return this.checkDate() >= trip.Start && this.checkDate() <= trip.End;
    }
    return true;
  }

  

}
