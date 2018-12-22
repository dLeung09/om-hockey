import { Component, OnInit } from '@angular/core';

import { Game } from '../../model/game';
import { Player } from '../../model/player';
import { Team } from '../../model/team';
import { GamesDataSource } from '../../services/games.datasource';
import { PlayersDataSource } from '../../services/players.datasource';
import { TeamsDataSource } from '../../services/teams.datasource';
import { BackendService } from '../../services/backend.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private upcomingGamesDatasource: GamesDataSource;
  private recentGamesDatasource: GamesDataSource;
  private standingsDatasource: TeamsDataSource;
  private statsDatasource: PlayersDataSource;

  private upcomingGamesColumns = [
    { columnDef: 'date', header: 'Date', cellData: (element: Game) => `${this.formatTime(element.date)}`, isSortable: false },
    { columnDef: 'arena', header: 'Arena', cellData: (element: Game) => `${element.arena}`, isSortable: false },
    { columnDef: 'awayTeam', header: 'Away Team', cellData: (element: Game) => `${element.awayTeam}`, isSortable: false },
    { columnDef: 'homeTeam', header: 'Home Team', cellData: (element: Game) => `${element.homeTeam}`, isSortable: false },
  ];

  private recentGamesColumns = [
    { columnDef: 'date', header: 'Date', cellData: (element: Game) => `${this.formatTime(element.date)}`, isSortable: false },
    { columnDef: 'awayTeam', header: 'Away Team', cellData: (element: Game) => `${element.awayTeam}`, isSortable: false },
    { columnDef: 'awayScore', header: 'Away Score', cellData: (element: Game) => `${element.awayScore || '-'}`, isSortable: false },
    { columnDef: 'homeScore', header: 'Home Score', cellData: (element: Game) => `${element.homeScore || '-'}`, isSortable: false },
    { columnDef: 'homeTeam', header: 'Home Team', cellData: (element: Game) => `${element.homeTeam}`, isSortable: false },
  ];

  private standingsColumns = [
    { columnDef: 'team', header: 'Team', cellData: (element: Team) => `${element.name}`, isSortable: false },
    { columnDef: 'gamesPlayed', header: 'GP', cellData: (element: Team) => `${element.gamesPlayed}`, isSortable: true },
    { columnDef: 'wins', header: 'W', cellData: (element: Team) => `${element.wins}`, isSortable: true },
    { columnDef: 'losses', header: 'L', cellData: (element: Team) => `${element.losses}`, isSortable: true },
    { columnDef: 'ties', header: 'T', cellData: (element: Team) => `${element.ties}`, isSortable: true },
    { columnDef: 'points', header: 'Pts', cellData: (element: Team) => `${element.points}`, isSortable: true },
  ];

  private statsColumns = [
    { columnDef: 'name', header: 'Name', cellData: (element: Player) => `${element.name}`, isSortable: true },
    { columnDef: 'team', header: 'Team', cellData: (element: Player) => `${element.team}`, isSortable: true },
    { columnDef: 'gamesPlayed', header: 'GP', cellData: (element: Player) => `${element.gamesPlayed}`, isSortable: true },
    { columnDef: 'goals', header: 'G', cellData: (element: Player) => `${element.goals}`, isSortable: true },
    { columnDef: 'assists', header: 'A', cellData: (element: Player) => `${element.assists}`, isSortable: true },
    { columnDef: 'points', header: 'P', cellData: (element: Player) => `${element.points}`, isSortable: true },
    { columnDef: 'penalties', header: 'PIM', cellData: (element: Player) => `${element.penalties}`, isSortable: true },
    { columnDef: 'pointsPerGame', header: 'PPG', cellData: (element: Player) => `${element.pointsPerGame.toFixed(2)}`, isSortable: true },
  ];

  upcomingGames: Game[] = [];
  recentGames: Game[] = [];

  constructor(private backendService: BackendService, private dataService: DataService) { }

  ngOnInit() {
    this.upcomingGamesDatasource = new GamesDataSource(this.dataService);
    this.upcomingGamesDatasource.setSort('asc', 'date');
    this.upcomingGamesDatasource.setFilter('', '');
    this.upcomingGamesDatasource.setNumResults(5);

    this.recentGamesDatasource = new GamesDataSource(this.dataService);
    this.recentGamesDatasource.setSort('desc', 'date');
    this.recentGamesDatasource.setFilter('', '');
    this.recentGamesDatasource.setNumResults(5);

    this.standingsDatasource = new TeamsDataSource(this.dataService);
    this.standingsDatasource.setSort('desc', 'points');
    this.standingsDatasource.setFilter('', '');

    this.statsDatasource = new PlayersDataSource(this.dataService);
    this.statsDatasource.setSort('desc', 'points');
    this.statsDatasource.setFilter('', '');
    this.statsDatasource.setNumResults(10);
  }

  private formatDate(dateStr: Date) : string {
    let date = new Date(dateStr);
    let options = { year: 'numeric', month: 'long', day: 'numeric' };

    return date.toLocaleDateString("en-US", options);
  }

  private formatTime(time: Date) : string {
    let options = { hour: 'numeric', minute: 'numeric' };

    return time.toLocaleString("en-US", options);
  }

}
