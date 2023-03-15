import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { max } from 'rxjs';
import { Trip } from '../trips/trips.component';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

  constructor() { }
  @Input() items!: Map<Trip, number>;
  ngOnInit(): void {
  }
  @Output() country: EventEmitter<string> = new EventEmitter<string>;
  selectedCountry = '';
  @Output() minCost: EventEmitter<number> = new EventEmitter<number>;
  selectedMinCost = 0;
  @Output() maxCost: EventEmitter<number> = new EventEmitter<number>;
  selectedMaxCost = Number.MAX_VALUE;
  @Output() start: EventEmitter<string> = new EventEmitter<string>;
  selectedStart = '';
  @Output() end: EventEmitter<string> = new EventEmitter<string>;
  selectedEnd = '';
  @Output() rate: EventEmitter<number> = new EventEmitter<number>;
  selectedRate = 0;

  countryChange(filter : string){
    this.selectedCountry = filter;
    this.country.emit(this.selectedCountry);


  }
  rateChange(filter : number){
    this.selectedRate = filter;
    this.rate.emit(this.selectedRate);
  }
  minCostChange(filter : number){
    this.selectedMinCost = filter;
    this.minCost.emit(this.selectedMinCost);
    console.log(filter);
  }
  maxCostChange(filter : number){
    this.selectedMaxCost = filter;
    this.maxCost.emit(this.selectedMaxCost);
  }

  startChange(filter : string){
    this.selectedStart = filter;
    this.start.emit(this.selectedStart);

  }
  endChange(filter : string){
    this.selectedEnd = filter;
    this.end.emit(this.selectedEnd);

  }
}

