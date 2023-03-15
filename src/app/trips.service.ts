import { Injectable, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FireBaseServiceService } from './fire-base-service.service';

import { Review, Trip} from './trips/trips.component';

@Injectable({
  providedIn: 'root'
})
export class TripsService{

  
  items: Subscription | undefined
  trips: any[] = [];
  boughtTrips : Map<Trip, [number, string]> = new Map;
  cart: Map<Trip, number> = new Map;
  currency : string = "$";
  rate : number = 1;
  maxId = 0;
  reviewsItems: Subscription | undefined;
  reviews: any[] = [];
  
  constructor(private fb: FireBaseServiceService) {

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
    
        this.cart.set(trip, 0);
        this.maxId++;
      }});

      this.reviewsItems = fb.getReviews().subscribe(change => {this.reviews = []
    
        for (let review of change){
          this.reviews.push({
            TripId: review.TripId,
            TripName: review.TripName,
            Details: review.Details,
          } as Review)
      
        }});

    
  }


  getTrips() : Trip[]{
    return this.trips;
  }

  getCart() : Map<Trip, number>{
    return this.cart;
  }

  getTripById(id : number) : Trip{
    return this.trips[this.trips.findIndex(trip => trip.Id == id)]
  }

  getBoughtTrips() : Map<Trip, [number, string]>{
  return this.boughtTrips;
}  
changeCurrency(){
    if (this.currency == "$"){
      this.rate = 0.96;
      this.currency = "€";
    }
    else{
      this.rate = 1;
      this.currency = "$";
    }
  }

  getNewId(){
    return this.maxId + 1;
  }
   
  // reviews = [{nickname: "kacper", description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis distinctio cupiditate ipsam quibusdam deserunt laboriosam debitis ex ullam ducimus minus, facere fugiat nesciunt dignissimos, mollitia possimus officia laborum quam recusandae.", name: "all"

  // },
  //  {nickname: "Grzegorz", description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis distinctio cupiditate ipsam quibusdam deserunt laboriosam debitis ex ullam ducimus minus, facere fugiat nesciunt dignissimos, mollitia possimus officia laborum quam recusandae.", name: "all"}]

  getReviews() : Review[]{
    return this.reviews;
  }

}
