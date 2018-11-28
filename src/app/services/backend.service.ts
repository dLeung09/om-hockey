import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { Arena } from '../model/arena';
import { Game } from '../model/game';
import { Player } from '../model/player';
import { Team } from '../model/team';

interface PlayerSort {
  ascending: boolean;
  column: string;
}

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private gamesUrl = 'api/1/games';
  private teamsUrl = 'api/1/teams';
  private playersUrl = 'api/1/players';

  constructor(private http: HttpClient) { }

  public getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(this.gamesUrl)
    .pipe(
      catchError(this.handleError('getGames', []))
    );
  }

  public getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(this.teamsUrl)
    .pipe(
      catchError(this.handleError('getTeams', []))
    );
  }

  public getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(this.playersUrl)
    .pipe(
      catchError(this.handleError('getPlayers', []))
    );
  }

  private handleError<T> (operation = 'request', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    };
  }
}
