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

  private arenasUrl = 'api/1/arenas';
  private gamesUrl = 'api/1/games';
  private teamsUrl = 'api/1/teams';
  private playersUrl = 'api/1/players';

  constructor(private http: HttpClient) { }

  public getArenas(): Observable<Arena[]> {
    return this.http.get<Arena[]>(this.arenasUrl)
    .pipe(
      catchError(this.handleError('getArenas', []))
    );
  }

  public getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(this.gamesUrl)
    .pipe(
      catchError(this.handleError('getGames', []))
    );
  }

  public getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(this.teamsUrl)
    .pipe(
      map(teams => {
        teams.forEach(team => {
          team.points = team.wins * 2 + team.ties;
        });

        return teams;
      }),
      catchError(this.handleError('getTeams', []))
    );
  }

  public getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(this.playersUrl)
    .pipe(
      map(players => {
        players.forEach(player => {
          if (player.gamesPlayed < 1) {
            player.pointsPerGame = player.points;
            return;
          }

          player.pointsPerGame = player.points / player.gamesPlayed;
        });

        return players;
      }),
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
