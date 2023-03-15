import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { TripsService } from '../trips.service';
import { Trip } from '../trips/trips.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  $user!: Observable<any>;
  constructor(private tripsservice : TripsService, private au : AuthService) { }
  public innerWidth: any;
  show = true;
  cartItems: Map<Trip, number> = this.tripsservice.getCart();
  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
  }

  change(){
    this.show = !this.show;
    
  }

  checkLogged(){
    return this.au.loggedIn;
  }

  numOfTrips() : number{
    let counter : number = 0;
    for (const [key, value] of this.cartItems){
        counter += value;
    }
    return counter;
    
  }

  logout(){
    this.au.logout();
  }
  closeSidebar(){
    this.show = true;
  }
  @HostListener('window:resize', ['$event'])
  onResize() {
  this.innerWidth = window.innerWidth;

  if (this.innerWidth <= 1283){

    this.show = true;
  }


}


  

}
