import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';

import { catchError, tap, map } from 'rxjs/operators';

import { BackendService } from './backend.service';
import { Arena } from '../model/arena';
import { Game } from '../model/game';
import { Player } from '../model/player';
import { Team } from '../model/team';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private _games: Game[];
  private _players: Player[];
  private _teams: Team[];

  constructor(private backendService: BackendService) {
    this._games = [];
    this._players = [];
    this._teams = [];
  }

  public getTeamsSorted(
    sortColumn: string,
    sortDirection: string,
  ): Observable<Team[]> {
    let response: Observable<Team[]>;

    if (this._teams == null || this._teams.length < 1) {
      response = this.backendService.getTeams().pipe(
        tap(teams => { this._teams = teams; } )
      );
    } else {
      response = of(this._teams);
    }

    return response.pipe(
      map(this.sortByColumn(sortColumn, sortDirection)),
    );
  }

  public getPlayersSorted(
    sortColumn: string,
    sortDirection: string,
  ): Observable<Player[]> {
    let response: Observable<Player[]>;

    if (this._players == null || this._players.length < 1) {
      response = this.backendService.getPlayers().pipe(
        tap(players => { this._players = players; })
      );
    } else {
      response = of(this._players);
    }

    return response.pipe(
      map(this.sortByColumn(sortColumn, sortDirection)),
    );
  }

  public getGamesSorted(
    team: string,
    sortColumn: string,
    sortDirection: string,
  ): Observable<Game[]> {
    let response: Observable<Game[]>;

    if (this._games == null || this._games.length < 1) {
      response = this.backendService.getGames().pipe(
        tap(games => { this._games = games; } )
      );
    } else {
      response = of(this._games);
    }

    const homeGames = response.pipe(
      map(this.filterByTeam(team, 'homeTeam'))
    );

    const awayGames = response.pipe(
      map(this.filterByTeam(team, 'awayTeam'))
    );

    return forkJoin([homeGames, awayGames]).pipe(
      map(games => {
        return [].concat(...games);
      }),
      map(this.sortByColumn(sortColumn, sortDirection))
    );
  }

  private filterByTeam (teamFilter: string, teamKey: string) {
    return (data: any) => {
      if (teamFilter == null || teamFilter === '') {
        return data;
      }

      return data.filter(element => {
        return element.hasOwnProperty(teamKey) && element[teamKey] === teamFilter;
      });
    };
  }

  private filterByPlayer (playerFilter: string, playerKey: string) {
    return (data: any) => {
      return data.filter(element => {
        if (playerFilter == null || playerFilter === '') {
          return data;
        }

        return element.hasOwnProperty(playerKey) && element[playerKey] === playerFilter;
      });
    };
  }

  private sortByColumn (sortColumn: string, sortDirection: string) {
    return (data: any) => {
      const dataResult = data.sort( (a, b) => {
        let aObj = a[sortColumn];
        let bObj = b[sortColumn];

        if (sortColumn.match(/date/i)) {
          aObj = new Date(a[sortColumn]);
          bObj = new Date(b[sortColumn]);
        }

        //if (a[sortColumn] < b[sortColumn]) {
        if (aObj < bObj) {
          return -1;
        }

        //if (b[sortColumn] < a[sortColumn]) {
        if (bObj < aObj) {
          return 1;
        }

        return 0;
      });

      return sortDirection !== 'desc' ? dataResult : dataResult.reverse();
    };
  }
}
