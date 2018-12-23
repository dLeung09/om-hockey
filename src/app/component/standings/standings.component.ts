import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
// import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Game } from '../../model/game';
import { Team, GameScore } from '../../model/team';
import { TeamsDataSource } from '../../services/teams.datasource';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.css']
})
export class StandingsComponent implements OnInit, AfterViewInit {

  private datasource: TeamsDataSource;

  private columns = [
    { columnDef: 'team', header: 'Team', cellData: (element: Team) => `${element.name}`, isSortable: false },
    { columnDef: 'gamesPlayed', header: 'GP', cellData: (element: Team) => `${element.gamesPlayed}`, isSortable: true },
    { columnDef: 'wins', header: 'W', cellData: (element: Team) => `${element.wins}`, isSortable: true },
    { columnDef: 'losses', header: 'L', cellData: (element: Team) => `${element.losses}`, isSortable: true },
    { columnDef: 'ties', header: 'T', cellData: (element: Team) => `${element.ties}`, isSortable: true },
    { columnDef: 'points', header: 'Pts', cellData: (element: Team) => `${element.points}`, isSortable: true },
    { columnDef: 'goalsFor', header: 'GF', cellData: (element: Team) => `${element.goalsFor}`, isSortable: true },
    { columnDef: 'goalsAgainst', header: 'GA', cellData: (element: Team) => `${element.goalsAgainst}`, isSortable: true },
    { columnDef: 'streak', header: 'Streak', cellData: (element: Team) => `${this.getStreak(element)}`, isSortable: false },
    { columnDef: 'lastFive', header: 'Last 5', cellData: (element: Team) => `${this.getLastFive(element)}`, isSortable: false },
    { columnDef: 'lastTen', header: 'Last 10', cellData: (element: Team) => `${this.getLastTen(element)}`, isSortable: false },
  ];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.datasource = new TeamsDataSource(this.dataService);
    this.datasource.setSort('desc', 'points');
    this.datasource.setFilter('', '');
  }

  ngAfterViewInit() { }

  private getPoints(team: Team) : number {
    return team.wins * 2 + team.ties;
  }

  // Returns 'W#' if the result of the last '#' of games were all wins
  // Returns 'L#' if the result of the last '#' of games were all losses
  // Returns 'T#' if the result of the last '#' of games were all ties
  // Default is 'W0'
  private getStreak(team: Team) : string {
    if (team.streak == null || team.streak.streakType == null || team.streak.streakCount < 0) {
      return 'W0';
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
