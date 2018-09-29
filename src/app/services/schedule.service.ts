import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Arena } from '../model/arena';
import { Game } from '../model/game';
import { Team } from '../model/team';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private scheduleUrl = 'api/1/schedule';
  private teamsUrl = 'api/1/teams';

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

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    };
  }
}
