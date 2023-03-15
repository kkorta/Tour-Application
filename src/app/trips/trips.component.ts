import { Component, Injectable, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { remove } from 'firebase/database';
import { Observable, Subscription } from 'rxjs';
import { FireBaseServiceService } from '../fire-base-service.service';
import { TripsService } from '../trips.service';


@Injectable()

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit {
 
  items: Subscription | undefined
  reviewsItems: Subscription | undefined
  trips: any[] = [];
  reviews: any[] = [];

  constructor(private tripsservice : TripsService, private fb : FireBaseServiceService, private readonly au : AngularFireAuth) {
    this.items = fb.getTrips().subscribe(change => {this.trips = []

    for (let trip of change){
      this.trips.push({
        Id: trip.Id,
        Name: trip.Name,
        Country: trip.Country,
        Start: trip.Start,
        End: trip.End,
        Price: trip.Price,
        Amount: trip.Amount,
        Image: trip.Image,
        Description: trip.Description,
        Rating: trip.Rating,

      } as Trip)
  
    }});
    this.reviewsItems = fb.getReviews().subscribe(change => {this.reviews = []
    
      for (let review of change){
        this.reviews.push({
          TripId: review.TripId,
          TripName: review.TripName,
          Details: review.Details,
        })
    
      }});
  
  }



  user$ = this.au.user;
  cart: Map<Trip, number> = this.tripsservice.getCart();
  parentCurrency = this.tripsservice.currency;
  parentRate = this.tripsservice.rate;
  show : boolean = false;
  counter: number = 0;
  countryFilter = '';
  minPrice = 0;
  maxPrice = Number.MAX_VALUE;
  end = '';
  start = '';
  rateFilter = 0;

  ngOnInit(): void {

  }
  
  add(trip : Trip){
    console.log(this.user$)
    for (const [key, value] of this.cart){
      if (key.Name === trip.Name){
        this.cart.set(key, value + 1);
      }
    }  

  }
  checkNum(trip : Trip){
    for (const [key, value] of this.cart){
      if (key.Name === trip.Name && value == 0){
        return true;
      }
    }
    return false;
  }

  
  oppositeCurrency() : string{
    if (this.parentCurrency == "€"){
      return "$";
    }
    return "€";

  }
  minus(trip : Trip){
  
    for (const [key, value] of this.cart){
      if (key.Name === trip.Name){
        this.cart.set(key, value - 1);
  
      }
    }
  }

  tripsAvailable(trip : Trip) : number{
    for (const [key, value] of this.cart){
      if (key.Name === trip.Name){
          return trip.Amount - value;
      }
    }
    return -1;
  }
  
  tripsInCart(trip :Trip){
    for (const [key, value] of this.cart){
      if (key.Name === trip.Name){
          return value;
      }
    }
    return;
  }
  deleteTrip(trip: Trip){
  
    this.fb.removeTrip(trip.Id);    
  }

  addTrip(trip: Trip){
    this.trips.push(trip);
    this.cart.set(trip, 0);


  }

  checkMax(trips: Trip[]) : Trip{
    let currMax = -1;
    let maxTrip = trips[0];
    for (let trip of this.trips){
      if (trip.Price > currMax){
        maxTrip = trip;
        currMax = trip.Price;
      }
    }

    return maxTrip;
  }

  checkMin(trips: Trip[]) : Trip{
    let currMin = Number.MAX_VALUE;
    let minTrip = trips[0];
    for (let trip of this.trips){
      if (trip.Price < currMin){
        minTrip = trip;
        currMin = trip.Price;
      }
    }
    return minTrip;
  }
  currencySwitch(){
    this.tripsservice.changeCurrency();
    this.parentCurrency = this.tripsservice.currency;
    this.parentRate = this.tripsservice.rate;
  }



  reserved(){
    this.counter = 0;
    for (const [key, value] of this.cart){
      this.counter += value;
    }
    return this.counter;
  }

  filterCountry(data : string){
    this.countryFilter = data;
  }

  filterRate(data: number){
    this.rateFilter = data;
  }
}


export interface Trip {
  Id: number;
  Name: string;
  Country: string;
  Start: string;
  End: string;
  Price: number;
  Amount: number;
  Image: string;
  Description: string;
  Rating: number;
}

export interface Review {
  TripId: number;
  TripName: String;
  Details: any[];
}

export interface ReviewDetails{
  Nickname: string;
  Description: string;
  Rating: number;
  Date: string;
  Likes: number;
  Dislikes: number;
}