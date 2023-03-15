import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTripComponent } from './add-trip/add-trip.component';
import { CartComponent } from './cart/cart.component';
import { HistoryComponent } from './history/history.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './register/register.component';
import { SingleTripComponent } from './single-trip/single-trip.component';
import { TripsComponent } from './trips/trips.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '', component: HomeComponent},
  {path: 'trips', component: TripsComponent},
  {path: 'trips/:id', component: SingleTripComponent},
  {path: 'history', component: HistoryComponent},
  {path: 'add-trip', component: AddTripComponent},
  {path: 'cart', component: CartComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
