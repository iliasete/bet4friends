import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Match } from './matches.service';

@Injectable({
  providedIn: 'root'
})
export class CurrentWeekService {

  private currentWeekDoc: AngularFirestoreDocument<{}>;
  constructor( private afs: AngularFirestore ) { }

  getCurrentWeek(): Observable<any> {
    this.currentWeekDoc = this.afs.doc('currentWeekPlay/data');
    return this.currentWeekDoc.valueChanges();
  }

  setCurrentWeekMatches(matches: {[key: string]: Match}) {
    this.currentWeekDoc.update({ matches: matches });
  }
}
