import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Game } from '../game';
import { Team } from '../team';
import { SampleData } from '../sample-data/sample-data.model';

@Injectable()
export class DemoModeInterceptor implements HttpInterceptor {

  private games: Game[] = null;
  private teams: Team[] = null;

  constructor() {
    if (this.games === null) {
      this.games = JSON.parse(SampleData.Games);
    }

    if (this.teams === null) {
      let tempTeams = JSON.parse(SampleData.Teams)
        .filter( team => team.id !== 0 );   // Filter out the spare list

      this.teams = tempTeams;
    }
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(`${request.method} request received: ${request.url}`);

    let baseUrl = "api/1";

    let standingsRegex = new RegExp(`${baseUrl}\\/standings`);

    let scheduleRegex = new RegExp(`${baseUrl}\\/schedule$`);
    let scheduleIdRegex = new RegExp(`${baseUrl}\\/schedule\\/(\\d+)$`);

    let teamsRegex = new RegExp(`${baseUrl}\\/teams`);

    // Standings
    if (request.url.match(standingsRegex) !== null) {
      if (request.method.match(/get/i)) {
        return of(new HttpResponse({ status: 200, body: "Found it!"}));
      }
    }

    // Schedule
    let teamId;
    [,teamId] = request.url.match(scheduleIdRegex) || [null, null];
    if (teamId != null) {
      if (request.method.match(/get/i)) {
        let filteredGames = this.filterGames(teamId);

        if (filteredGames == null) {
          console.error("Filtered list of games is null");
          return of(new HttpResponse({ status: 404, body: `Team (id=${teamId}) not found!` }));
        }
        return of(new HttpResponse({ status: 200, body: filteredGames }));
      }
    }
    else if (request.url.match(scheduleRegex) !== null) {
      if (request.method.match(/get/i)) {
        return of(new HttpResponse({ status: 200, body: this.games }));
      }
    }

    // Teams
    if (request.url.match(teamsRegex) !== null) {
      if (request.method.match(/get/i)) {
        return of(new HttpResponse({ status: 200, body: this.teams }));
      }
    }

    // Not found
    return of(new HttpResponse({ status: 404, body: "Not found!"}));
  }

  private filterGames(teamId: number): Game[] {
    let teamNames = this.teams.filter( (team) => {
      return team.id == teamId
    });

    console.log(teamNames);
    if (teamNames.length !== 1) {
      console.error("Could not find team!");
      return null;
    }

    let teamName = teamNames[0];

    let filteredGames = this.games.filter( (game) => {
      return (game.homeTeam) === (teamName.name) || (game.awayTeam) === (teamName.name);
    });

    return filteredGames;
  }
}
