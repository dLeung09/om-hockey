import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Arena } from '../../model/arena';
import { Game } from '../../model/game';
import { Team } from '../../model/team';
import { Player } from '../../model/player';
import { SampleData } from '../sample-data/sample-data.model';

@Injectable()
export class DemoModeInterceptor implements HttpInterceptor {

  private arenas: Arena[] = null;
  private games: Game[] = null;
  private teams: Team[] = null;
  private players: Team[] = null;

  constructor() {
    if (this.arenas == null) {
      this.arenas = JSON.parse(SampleData.Arenas);
    }

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
    const baseUrl = "api/1";
    const arenaRegex = new RegExp(`${baseUrl}\\/arenas`);
    const gamesRegex = new RegExp(`${baseUrl}\\/games`);
    const playersRegex = new RegExp(`${baseUrl}\\/players`);
    const teamsRegex = new RegExp(`${baseUrl}\\/teams`);

    if (request.url.match(arenaRegex) != null) {
      if (request.method.match(/get/i)) {
        return of(new HttpResponse({ status: 200, body: this.arenas }));
      }
    } else if (request.url.match(gamesRegex) != null) {
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
}
