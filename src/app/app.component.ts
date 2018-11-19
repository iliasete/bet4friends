import { Component, OnInit } from '@angular/core';
import { AngularFirestore, DocumentChangeAction, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private usersCollection: AngularFirestoreCollection<any>[];
  users: Observable<any[]>;

  constructor ( private firestore: AngularFirestore ) {}

  ngOnInit(): void {
    this.users = this.firestore.collection('users').valueChanges()
  }
}
