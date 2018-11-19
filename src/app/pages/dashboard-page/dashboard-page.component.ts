import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { CurrentWeekService } from '../../services/current-week.service';
import { combineLatest, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { UsersService } from '../../services/users.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { MatchesSelectorComponent } from '../../components/matches-selector/matches-selector.component';
import { Match } from '../../services/matches.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {
  currentWeekData: any;
  users: any;
  currentUser = this.users$.currentUser;

  constructor(
    private currentWeek$: CurrentWeekService,
    private users$: UsersService,
    private dialog: MatDialog) { }

  ngOnInit() {
    const subscription = combineLatest(
      this.currentWeek$.getCurrentWeek(),
      this.users$.getUsers()
    ).subscribe(mergedData => [this.currentWeekData, this.users] = [ ...mergedData ]);
  }

  onClickSelectMatches() {
    const dialog = this.dialog.open(MatchesSelectorComponent, {
      width: '800px',
      height: '500px'
    });

    dialog.afterClosed().subscribe((matches: Set<Match>) => {
      const newMatches = Array.from(matches).reduce((newMatches, match, index) => {
        newMatches[`match${ ++index }`] = match;
        return newMatches;
      }, {});
      this.currentWeek$.setCurrentWeekMatches(newMatches);
    });
  }
}
