import { Component, Injectable, Input, NgModule, OnInit, Output } from '@angular/core';
import { FireBaseServiceService } from '../fire-base-service.service';
import { TripsService } from '../trips.service';
import { Trip, TripsComponent } from '../trips/trips.component';
  

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {

  rate = 1;
  currency = this.tripsservice.currency;
  constructor(private tripsservice : TripsService, private fb : FireBaseServiceService) { }
  ngOnInit(): void {
  }
  cartItems: Map<Trip, number> = this.tripsservice.getCart();
  trips: Trip[] = this.tripsservice.trips;
  boughtTrips : Map<Trip, [number, string]> = this.tripsservice.getBoughtTrips();

  increment(x : Trip){
    for (const [key, value] of this.cartItems){
      if (x.Name == key.Name){
          this.cartItems.set(key, value + 1);
      }
    }
  }

  decrement(x : Trip){
    for (const [key, value] of this.cartItems){
      if (x.Name == key.Name){
          this.cartItems.set(key, value - 1);
      }
    }
  }

  cartValue() : number{
    let cost : number = 0;
    this.changeRate();

    for (const [key, value] of this.cartItems){
        cost += (key.Price * value);
    }
    return cost;
  }

  changeRate(){
    if (this.currency == "$"){
      this.rate = 1;
    }
    else{
      this.rate = 0.96;
    }
  }

  buyTrip(trip: Trip, value : number){
    this.fb.changeAmount(trip.Id, trip.Amount - value);
    this.trips.map(obj => {if (obj.Name == trip.Name){obj.Amount -= value}})
    this.cartItems.set(trip, 0);
    let date  = new Date();
    if (this.boughtTrips.has(trip)){
        let val = 0;
        for (const [key, valu] of this.boughtTrips){
          if (key.Name == trip.Name){
            val = valu[0];
          }
      }
      this.boughtTrips.set(trip, [val + value, date.toLocaleDateString()])
    }
    else{
      this.boughtTrips.set(trip, [value, date.toLocaleDateString()]);
    }
  }

  

}
