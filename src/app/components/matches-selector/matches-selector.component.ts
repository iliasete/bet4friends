import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { SofascoreService } from '../../services/sofascore.service';
import { Match } from '../../services/matches.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

const MAX_SELECTIONS = 3;

@Component({
  selector: 'app-matches-selector',
  templateUrl: './matches-selector.component.html',
  styleUrls: ['./matches-selector.component.css']
})
export class MatchesSelectorComponent implements OnInit {

  matches: Match[];
  selectedMatches: Set<Match> = new Set();
  displayedColumns: string[] = ['date', 'label', 'odds', 'select'];
  allSelected: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<MatchesSelectorComponent>,
    private sofascore$: SofascoreService
  ) { }

  ngOnInit() {
    this.sofascore$.getAllMatches().pipe(take(1)).subscribe(allMatches => this.matches = allMatches);
  }

  toggleMatch(match: Match) {
    const exists = this.selectedMatches.has(match);
    this.selectedMatches[exists ? 'delete' : 'add'](match);
    this.allSelected = this.selectedMatches.size === MAX_SELECTIONS;
  }

}
