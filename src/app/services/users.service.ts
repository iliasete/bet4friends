import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private users: any[];
  currentUser: any;

  constructor(private afs: AngularFirestore) { }

  getUsers(): Observable<any> {
    return this.afs.collection('users').valueChanges();
  }

  setCurrentUser(data: any) {
    this.currentUser = data;
  }
}
