import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';

import { BackendService } from '../../services/backend.service';
import { Game } from '../../model/game';
import { Team, GameScore } from '../../model/team';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.css']
})
export class StandingsComponent implements OnInit {

  private teams: Team[] = null;
  private datasource: MatTableDataSource<Team>;

  private displayedColumns = [
    'team',
    'gamesPlayed',
    'wins',
    'losses',
    'ties',
    'points',
    'goalsFor',
    'goalsAgainst',
    'streak',
    'lastFive',
    'lastTen',
  ];

  @ViewChild(MatSort) sort: MatSort

  constructor(private backendService: BackendService) { }

  ngOnInit() {
    if (this.teams === null) {
      this.getTeams();
      this.datasource = new MatTableDataSource(this.teams);
    }

    this.datasource.sort = this.sort;
  }

  public getTeams(): void {
    this.backendService.getTeams()
    .subscribe( (teams: Team[]) => {
      console.log("Retrieving teams. Count:", teams.length);

      teams.sort( (a: Team, b: Team) => {
        let pointsA = this.getPoints(a);
        let pointsB = this.getPoints(b);

        if (pointsB - pointsA !== 0) {
          return pointsB - pointsA;
        }

        if (b.gamesPlayed - a.gamesPlayed !== 0) {
          return b.gamesPlayed - a.gamesPlayed;
        }

        if (b.wins - a.wins !== 0) {
          return b.wins - a.wins;
        }

        return (b.goalsFor - b.goalsAgainst) - (a.goalsFor - a.goalsAgainst);

      });

      this.teams = teams;
    });
  }

  private getPoints(team: Team) : number {
    return team.wins * 2 + team.ties;
  }

  // Returns 'W#' if the result of the last '#' of games were all wins
  // Returns 'L#' if the result of the last '#' of games were all losses
  // Returns 'T#' if the result of the last '#' of games were all ties
  // Default is 'W0'
  private getStreak(team: Team) : string {
    if (team.streak == null || team.streak.streakType == null || team.streak.streakCount < 0) {
      return "W0";
    }

    return `${team.streak.streakType}${team.streak.streakCount}`;
  }

  private getLastFive(team) : string {
    let lastFive = new Array<GameScore>();
    for (let i = 0; i < 5; i++) {
      let game = team.lastTen[team.lastTen.length - 1 - i];
      lastFive.push(game);
    }

    return this.getRecord(lastFive, team.name);
  }

  private getLastTen(team) : string {
    return this.getRecord(team.lastTen, team.name);
  }

  private getRecord(games : Array<GameScore>, teamName: string) : string {
    let wins = 0;
    let ties = 0;
    let losses = 0;
    let goalsFor = 0;
    let goalsAgainst = 0;

    for (let game of games) {
      if (game.homeTeam.name === teamName) {
        goalsFor += game.homeScore;
        goalsAgainst += game.awayScore;

        if (game.homeScore > game.awayScore)
          wins++;

        else if (game.homeScore < game.awayScore)
          losses++;

        else
          ties++;
      }

      else {
        goalsFor += game.awayScore;
        goalsAgainst += game.homeScore;

        if (game.homeScore < game.awayScore)
          wins++;

        else if (game.homeScore > game.awayScore)
          losses++;

        else
          ties++;
      }
    }

    return `${wins}-${losses}-${ties} (${goalsFor} GF, ${goalsAgainst} GA)`;
  }

}
