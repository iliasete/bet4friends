import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { AngularFirestore } from "angularfire2/firestore";

@Injectable()
export class AppDataResolver implements Resolve<any> {

  constructor( private firestore: AngularFirestore ) { }

  resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
      return this.firestore.collection('weekPlay').valueChanges();
  }
}
