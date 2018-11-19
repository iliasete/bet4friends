import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, flatMap, tap, filter } from 'rxjs/operators';
import { MatchesService, Match } from './matches.service';

const BASE_URL = 'https://www.sofascore.com';
const MIN_ODD_VALUE = 2;

interface Tournament {
  id: number,
  season: number,
  nextRound?: number
}

@Injectable({
  providedIn: 'root'
})
export class SofascoreService {

  private readonly TOURNAMENTS: Tournament[] = [
    { id: 8, season: 18020 },
    { id: 17, season: 17359 },
    { id: 23, season: 17932 },
    { id: 35, season: 17597 },
    { id: 34, season: 17279 }
  ];

  constructor(
    private http: HttpClient,
    private matches$: MatchesService) { }

  getAllMatches(): Observable<Match[]> {
    const tournamentRequests = this.TOURNAMENTS.map(tournament => this.tournamentRequest(tournament));
    let nextRounds: number[];
    return forkJoin(...tournamentRequests)
      // get next round numbers
      .pipe(map(currentTournaments => this.getNextRoundRequests(currentTournaments)))
      // Request all next matches
      .pipe(flatMap(roundsRequests => forkJoin(...roundsRequests)))
      // FlatMap result to get unique array with all matches
      .pipe(map(res => res.flatMap(round => round.roundMatches.tournaments[0].events)))
      // Request all matches details
      .pipe(flatMap(rawMatchesData => forkJoin(...this.getMatchesRequests(rawMatchesData))))
      // Filter matches where all odds are > MIN_ODD_VALUE
      .pipe(map(matches => matches.filter(
        match => match.odds[0].regular[0].odds.every(odd => odd.decimalValue > MIN_ODD_VALUE)))
      )
      // Map values to Match
      .pipe(map(matches => matches.map(match => this.matches$.createMatchFromRawData(match))))
  }

  private tournamentRequest(tournament: Tournament): Observable<any> {
    const url = `${BASE_URL}/u-tournament/${ tournament.id }/season/${ tournament.season }/json`;
    return this.http.get(url);
  }

  private getNextRoundData(tournament: any) {
    return {
      nextRound: tournament.standingsTables[0].round + 1,
      id: tournament.uniqueTournament.id,
      season: tournament.season.id
    }
  }

  private getNextRoundRequests(currentTournaments: any) {
    const nextRounds: Tournament[] = currentTournaments.map(tournament => this.getNextRoundData(tournament));
    return nextRounds.map(round => this.nextRoundRequests(round))
  }

  private nextRoundRequests (data: Tournament): Observable<any> {
    const url = `${BASE_URL}/u-tournament/${data.id}/season/${data.season}/matches/round/${data.nextRound}`
    return this.http.get(url);
  }

  private getMatchesRequests(rawMatches: any) {
    return rawMatches.map(matchData => this.http.get(`https://www.sofascore.com/event/${matchData.id}/json`));
  }
}
