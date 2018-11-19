import { Injectable } from '@angular/core';

export interface Match {
  day: Date,
  finished: boolean;
  isTied: boolean;
  label: string;
  odds: {[key: string]: number};
  bets?: {[key: string]: string};
  result?: string;
  selectedBet?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MatchesService {

  constructor() { }

  createMatchFromRawData(data: any): Match {
    return {
      day: new Date(data.event.startTimestamp * 1000),
      finished: false,
      isTied: false,
      label: data.event.name,
      odds: this.getSimpleOdds(data.odds)
    };
  }

  private getSimpleOdds(odds: any): {[key: string]: number} {
    return odds[0].regular[0].odds.reduce((simpleOdds, next) => {
      simpleOdds[next.choice] = next.decimalValue;
      return simpleOdds;
    }, {});
  }
}
