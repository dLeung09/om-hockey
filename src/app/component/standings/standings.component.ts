import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material';
import { Observable } from 'rxjs';
import { merge, tap } from 'rxjs/operators';

import { Game } from '../../model/game';
import { Team, GameScore } from '../../model/team';
import { TeamDataSource } from '../../services/teams.datasource';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.css']
})
export class StandingsComponent implements OnInit, AfterViewInit {

  private teams: Team[] = null;
  private datasource: TeamDataSource;

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

  @ViewChild(MatSort) sort: MatSort;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.datasource = new TeamDataSource(this.dataService);
    this.datasource.loadTeams('points', 'desc');
    this.sort.disableClear = true;
  }

  ngAfterViewInit() {
    this.sort.sortChange
      .pipe(
        //tap(() => console.log('DAVID: sort', this.sort)),
        tap(() => this.loadPlayers())
      )
    .subscribe();
  }

  private loadPlayers(): void {
    this.datasource.loadTeams(
      this.sort.active,
      this.sort.direction
    );
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
