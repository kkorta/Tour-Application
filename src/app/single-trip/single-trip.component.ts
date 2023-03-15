import { Component, OnInit, ViewChild} from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, Subscription } from 'rxjs';
import { FireBaseServiceService } from '../fire-base-service.service';
import { TripsService } from '../trips.service';
import { Review, ReviewDetails, Trip } from '../trips/trips.component';



@Component({
  selector: 'app-single-trip',
  templateUrl: './single-trip.component.html',
  styleUrls: ['./single-trip.component.css']
})
export class SingleTripComponent implements OnInit {


  items: Subscription | undefined
  reviewsItems: Subscription | undefined
  constructor (private route: ActivatedRoute, private tripservice : TripsService, private fb : FireBaseServiceService, private db : AngularFireDatabase) {
    
    this.items = fb.getTrips().subscribe(change => {this.trips = []
      for (let trip of change){
        if (trip.Id == this.id){
          this.trip = trip;

        }
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
      this.reviewsItems = fb.getReviews().subscribe(change => {this.allReviews = []
      
        for (let review of change){
          if (review.TripName == this.trip.Name){
            
            this.reviews = review.Details;
            this.allReviews.push({
              TripId: review.TripId,
              TripName: review.TripName,
              Details: review.Details,
            })
        }   
        }});
        
  
   }
  private subscription: Subscription | undefined  
  modelForm!: FormGroup;
  id: number = -1;
  trips!: Trip[];
  currency = this.tripservice.currency;
  rate = this.tripservice.rate;
  selected: number = 0;
  stars = [1, 2, 3, 4, 5];
  rating : number = 0;
  photos = [0, 1, 2];
  currPhoto : number = 0;
  currRating : number = 0;
  reviewName = "all";
  allReviews!: Review[];
  reviews!: any[];
  name!: string;
  trip!: Trip;
  showTextAreaError = false;
  showRatingError = false;
  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(params => this.id = params['id']);
    this.filterReviews
    this.modelForm = new FormGroup({
      Description: new FormControl(
        '',
        Validators.minLength(1)

      )
  
     })

}


ngOnDestroy(): void {
  if (this.subscription)
    this.subscription.unsubscribe()
}

getIndexOfTrip(id : number){
  return this.trips.findIndex(trip => trip.Id == id);
}

update(i: any){
  this.currRating = i;
}
updateLeft(){
  this.currPhoto = (this.currPhoto + 1) % 3
}
updateRight(){
  this.currPhoto = (this.currPhoto + 2) % 3
}
updatePhoto(i: any){
  this.currPhoto = i;
}
submitForm(){
  if (this.modelForm.invalid){
    this.showTextAreaError = true;
    return;
  }
  if (this.currRating == 0){
    this.showRatingError = true;
    return;
  }
  let date = new Date();
  let x : string = date.toLocaleDateString() +", " + date.getHours() + ":" + date.getMinutes();
  let newlyCreatedReview = {
    Nickname : "Guest",
    Description : this.modelForm.get('Description')!.value,
    Rating : this.currRating,
    Date: x,
    Likes: 0,
    Dislikes: 0,
  } as ReviewDetails
  let len = 0;
  try {
    len = this.reviews.length;
  } catch (error) {
    
  }
  this.showRatingError = false;
  this.showTextAreaError = false;
  this.currRating = 0;
  let index : string = this.id.toString();
  this.fb.addReview(newlyCreatedReview, index, len);
  this.modelForm.reset();

}

filterReviews(){
  for (let review of this.allReviews){
    if (review.TripName == this.name){
      this.reviews = review.Details;

    }
  }
}

starsCount(x: number){
  return Array(x).fill(0).map((x,i)=>i);
}

like(x: any){
  let likes = this.reviews[x].Likes;
  this.fb.likeComment(this.id, x, likes)
}
dislike(x : any){
  let dislikes = this.reviews[x].Dislikes;
  this.fb.dislikeComment(this.id, x, dislikes);

}


}



