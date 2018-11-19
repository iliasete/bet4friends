import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';
import { from } from 'rxjs';
import { takeWhile } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userDetails: firebase.User;

  constructor(
    private firebaseAuth: AngularFireAuth,
    private router: Router) { }

  loginWithFacebook(): Observable<auth.UserCredential> {
    return from(this.firebaseAuth.auth.signInWithPopup(new auth.FacebookAuthProvider()));
  }

  login(email: string, password: string) {
    return from(this.firebaseAuth.auth.signInWithEmailAndPassword(email, password));
  }

  isLoggedIn(): Observable<any> {
    return this.firebaseAuth.authState;
  }

  setPersistance(persistance: string) {
    return from(this.firebaseAuth.auth.setPersistence(persistance));
  }

}
