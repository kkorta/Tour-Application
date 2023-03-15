import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { getDatabase, ref, set } from "firebase/database";
import { first, map, Observable } from 'rxjs';
import { Review, ReviewDetails, Trip } from './trips/trips.component';
import { User } from './User';

@Injectable({
  providedIn: 'root'
})
export class FireBaseServiceService {

  trips!: Observable<any[]>
  reviews!: Observable<any[]>
  private nextId: number | undefined
  private nextIdReviews: number | undefined
  
  constructor(private db: AngularFireDatabase) {
    this.trips = db.list('Trips').valueChanges();
    this.db.list('Trips', ref=> ref.orderByChild('id').limitToLast(1)).valueChanges().subscribe((res: any[]) => {this.nextId = res[0]?.id+1})
    this.reviews = db.list('Reviews').valueChanges();
    
  }

  getTrips(){
    return this.trips;
  }
  getReviews(){
    return this.reviews;
  }
 

  
  addTrip(trip: Trip, idx : string){
    this.db.list('Trips').set(idx, {
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
    })
    this.db.list('Reviews').set(idx, {
      TripId: trip.Id,
      TripName: trip.Name,
      Details: [],
    
    })
  }
  addReview(review: ReviewDetails, idx : string, index : number){
    this.db.object(`Reviews/${idx}/Details/${index}`).set(review);
  }
  changeAmount(idx : number, value : number){
    this.db.object(`Trips/${idx}/${"Amount"}`).set(value);

  }

  removeTrip(id: number){
    
    this.db.list('Trips').snapshotChanges().pipe(first()).subscribe((items:any) =>{
      for(let i of items){
        if(i.payload.key==id)
        {
    
          this.db.list('Trips').remove(id + '');
        }
      }
    } )
  }
  
  checkReviews(){
    
  }

  likeComment(tripId : number, comId : number, likes : number){
    this.db.object(`Reviews/${tripId}/Details/${comId}/${"Likes"}`).set(likes + 1);
  }
  dislikeComment(tripId : number, comId : number, dislikes : number){
    this.db.object(`Reviews/${tripId}/Details/${comId}/${"Dislikes"}`).set(dislikes + 1);

  }
  addNewUser(user: User) {
    this.db.object('/users/' + user.uid).set({
      email: user.email,
      roles: user.role,
    });
  }
}