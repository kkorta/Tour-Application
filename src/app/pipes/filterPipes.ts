
import { PipeTransform, Pipe } from '@angular/core';
import { Trip } from '../trips/trips.component';



@Pipe({
    name: 'filterTrips',
    pure: false,
})
// minPrice: number, maxPrice: number, start: string, end: string,
export class FilterTrips implements PipeTransform {
    transform(value: any[], Country: string, rate: number): Trip[] {
        return value.filter(item => {
          if (Country != item.Country && Country != ""){
            return false;
          }
        //   if (minPrice <= 0 && minPrice > item.Price){
        //     return false;
        //   }
        //   if (maxPrice != Number.MAX_VALUE && maxPrice < item.Price){
        //     return false;
        //   }
        //   if (start != "" && start > item.Start){
        //     return false;
        //   }
        //   if (end != "" && end < item.End){
        //     return false;
        //   }
          if (rate != 0 && rate != item.Rating){
            return false
          }
          return true;
          
        })
      }
}


