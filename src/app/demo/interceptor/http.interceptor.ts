import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Game } from '../../model/game';
import { Team } from '../../model/team';
import { Player } from '../../model/player';
import { SampleData } from '../sample-data/sample-data.model';

@Injectable()
export class DemoModeInterceptor implements HttpInterceptor {

  private games: Game[] = null;
  private teams: Team[] = null;
  private players: Team[] = null;

  constructor() {
    if (this.games == null) {
      this.games = JSON.parse(SampleData.Games);
    }

    if (this.teams == null) {
      let tempTeams = JSON.parse(SampleData.Teams)
        .filter( team => team.id !== 0 );   // Filter out the spare list

      this.teams = tempTeams;
    }

    if (this.players == null) {
      this.players = JSON.parse(SampleData.Players);
    }
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // console.log(`${request.method} request received: ${request.url}`);

    const baseUrl = "api/1";
    const gamesRegex = new RegExp(`${baseUrl}\\/games`);
    const playersRegex = new RegExp(`${baseUrl}\\/players`);
    const teamsRegex = new RegExp(`${baseUrl}\\/teams`);

    if (request.url.match(gamesRegex) != null) {
      if (request.method.match(/get/i)) {
        return of(new HttpResponse({ status: 200, body: this.games }));
      }
    } else if (request.url.match(playersRegex)) {
      if (request.method.match(/get/i)) {
        return of(new HttpResponse({ status: 200, body: this.players }));
      }
    } else if (request.url.match(teamsRegex)) {
      if (request.method.match(/get/i)) {
        return of(new HttpResponse({ status: 200, body: this.teams }));
      }
    }

    // Not found
    return of(new HttpResponse({ status: 404, body: "Not found!"}));
  }

  //private filterPlayersByTeam(teamFilter: string, originalList: Array<Player>): Array<Player> {
  //  if (teamFilter != null && teamFilter !== '') {
  //    return originalList.filter( player => player.team.name === teamFilter );
  //  }

  //  return originalList;
  //}

  //private filterPlayersByName(playerFilter: string, originalList: Array<Player>): Array<Player> {
  //  if (playerFilter != null && playerFilter !== '') {
  //    return originalList.filter( player => player.name === playerFilter );
  //  }

  //  return originalList;
  //}

  //private sortPlayers(sortCol: string, sortDir: string, originalList: Array<Player>): Array<Player> {
  //  if (sortCol == null || sortCol === '' || sortCol === 'points') {
  //    return originalList.sort( (a, b) => {
  //      if (sortDir == null || sortDir != 'asc') {
  //        return b.pointsSeason - a.pointsSeason;
  //      }

  //      return a.pointsSeason - b.pointsSeason;
  //    });
  //  }

  //  else if (sortCol === 'player') {
  //    if (sortDir == null || sortDir != 'asc') {
  //      return originalList.sort(this.sortByPlayerName);
  //    }
  //    else {
  //      return originalList.sort(this.sortByPlayerName).reverse();
  //    }
  //  }

  //  else if (sortCol === 'team') {
  //    return originalList.sort( (a, b) => {
  //      let aTeam = a.team.name.toLowerCase();
  //      let bTeam = b.team.name.toLowerCase();
  //      let value;

  //      if (aTeam < bTeam) {
  //        value = -1;
  //      }
  //      else if (bTeam < aTeam) {
  //        value = 1;
  //      }
  //      else {
  //        value = this.sortByPlayerName(a, b);
  //      }

  //      if (sortDir == null || sortDir != 'asc') {
  //        return value * -1;
  //      }

  //      return value;
  //    });
  //  }

  //  else if (sortCol === 'gamesPlayed') {
  //    return originalList.sort( (a, b) => {
  //      if (sortDir == null || sortDir != 'asc') {
  //        return b.gamesPlayedSeason - a.gamesPlayedSeason;
  //      }

  //      return a.gamesPlayedSeason - b.gamesPlayedSeason;
  //    });
  //  }

  //  else if (sortCol === 'goals') {
  //    return originalList.sort( (a, b) => {
  //      if (sortDir == null || sortDir != 'asc') {
  //        return b.goalsSeason - a.goalsSeason;
  //      }

  //      return a.goalsSeason - b.goalsSeason;
  //    });
  //  }

  //  else if (sortCol === 'assists') {
  //    return originalList.sort( (a, b) => {
  //      if (sortDir == null || sortDir != 'asc') {
  //        return b.assistsSeason - a.assistsSeason;
  //      }

  //      return a.assistsSeason - b.assistsSeason;
  //    });
  //  }

  //  else if (sortCol === 'penalties') {
  //    return originalList.sort( (a, b) => {
  //      if (sortDir == null || sortDir != 'asc') {
  //        return b.penaltiesSeason - a.penaltiesSeason;
  //      }

  //      return a.penaltiesSeason - b.penaltiesSeason;
  //    });
  //  }

  //  else if (sortCol === 'pointsPerGame') {
  //    return originalList.sort( (a, b) => {
  //      let aPPG = a.gamesPlayedSeason < 1 ? 0 : a.pointsSeason / a.gamesPlayedSeason;
  //      let bPPG = b.gamesPlayedSeason < 1 ? 0 : b.pointsSeason / b.gamesPlayedSeason;

  //      if (sortDir == null || sortDir != 'asc') {
  //        return bPPG - aPPG;
  //      }

  //      return aPPG - bPPG;
  //    });
  //  }

  //  else {
  //    console.warn('Unrecognized column. Defaulting to points');
  //  }

  //  return originalList;
  //}

  //private sortByPlayerName(a: Player, b: Player): number {
  //  let aName = a.name.toLowerCase();
  //  let bName = b.name.toLowerCase();
  //  let value;

  //  if (aName < bName) {
  //    value = -1;
  //  }
  //  else if (bName < aName) {
  //    value = 1;
  //  }
  //  else {
  //    value = 0;
  //  }

  //  return value;
  //}

  //private paginatePlayers(pageNumber: number, pageSize: number, originalList: Array<Player>): Array<Player> {
  //  let playerList: Array<Player>;

  //  //TODO
  //  playerList = originalList;

  //  return playerList;
  //}

  //private filterGames(teamId: number): Game[] {
  //  let teamNames = this.teams.filter( (team) => {
  //    return team.id == teamId
  //  });

  //  console.log(teamNames);
  //  if (teamNames.length !== 1) {
  //    console.error("Could not find team!");
  //    return null;
  //  }

  //  let teamName = teamNames[0].name;

  //  let filteredGames = this.games.filter( (game) => {
  //    let homeTeam = game.homeTeam.name;
  //    let awayTeam = game.awayTeam.name;
  //    return homeTeam === teamName || awayTeam === teamName;
  //  });

  //  return filteredGames;
  //}
}

// https://stackoverflow.com/questions/28150967/typescript-cloning-object
//function clone(obj) {
//  let copy;
//
//  if (null == obj || "object" != typeof obj) return obj;
//
//  if (obj instanceof Date) {
//    copy = new Date();
//    copy.setTime( obj.getTime() );
//    return copy;
//  }
//
//  if (obj instanceof Array) {
//    copy = [];
//    for (let objIdx in obj) {
//      copy[objIdx] = clone(obj[objIdx]);
//    }
//    return copy;
//  }
//
//  if (obj instanceof Object) {
//    copy = {};
//    for (let attr in obj) {
//      if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
//    }
//    return copy;
//  }
//
//  throw new Error("Unable to copy obj! Its type isn't supported.");
//}
