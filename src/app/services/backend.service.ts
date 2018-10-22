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

  private scheduleUrl = 'api/1/schedule';
  private teamsUrl = 'api/1/teams';
  private playerUrl = 'api/1/players';

  constructor(private http: HttpClient) { }

  public getGames(teamId: number): Observable<Game[]> {
    let url = this.scheduleUrl;
    if (teamId > -1) {
      url = url.concat(`/${teamId}`);
    }

    return this.http.get<Game[]>(url)
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
    let url = this.playerUrl;

    return this.http.get<Player[]>(url)
      .pipe(
        catchError(this.handleError('getPlayers', []))
      );
  }

  public getPlayersSorted(
    team: string,
    player?: string,
    sortColumn = 'points',
    sortDirection = 'desc',
    pageIndex = 0,
    pageSize = 25
  ): Observable<Player[]> {
    return this.http.get(this.playerUrl, {
      params: new HttpParams()
      .set('team', team)
      .set('player', player)
      .set('sortCol', sortColumn)
      .set('sortDir', sortDirection)
      .set('pageNumber', pageIndex.toString())
      .set('pageSize', pageSize.toString())
    })
    .pipe(
      map(res => res['payload'])
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    };
  }
}
