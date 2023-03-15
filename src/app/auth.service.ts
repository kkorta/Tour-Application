import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<any>;
  loggedIn : boolean = false;

  constructor(private fa : AngularFireAuth, private router : Router) {
    this.user$ = this.fa.authState;
   }



  login(email : string, password : string){
    this.fa.signInWithEmailAndPassword(email, password).then(() => {
      localStorage.setItem('token', 'true');
      this.loggedIn = true;
      this.router.navigate(['']);
    }, err => {
      alert("Something went wrong");
      this.router.navigate(['/login'])
    }
  

    )

  }
 

  register(email : string, password : string){
    this.fa.createUserWithEmailAndPassword(email, password).then(() => {
      this.router.navigate(['login']);
    }, err =>{
      alert(err.message);
    })
  }

  logout() {
    this.fa.signOut().then( () => {
      this.loggedIn = false;
      localStorage.removeItem('token');
      this.router.navigate(['/login']); 
    }, err => {
      alert(err.message);
    })
  }

  getAuthenticated(){
    this.fa.onAuthStateChanged(user => {
      if (user) {
        console.log('Jesteś zalogowany');
      } else {
        console.log('Nie jesteś zalogowany');
      }
    });
  }
  getUser(){
    return this.user$;
  }
 
    

}
