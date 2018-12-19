import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { merge, tap } from 'rxjs/operators';

import { Game } from '../../model/game';
import { Team } from '../../model/team';
import { GamesDataSource } from '../../services/games.datasource';
import { DataService } from '../../services/data.service';

// const DefaultTeams: Team[] = [
//   { "id": -1, "name": "All Teams", "players": [] }
// ];

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit, AfterViewInit {

  private teams: Team[] = null;
  public teamFilter: string;

  private datasource: GamesDataSource;

  private columns = [
    { columnDef: 'date', header: 'Date', cellData: (element: Game) => `${this.formatDate(element.date)}`, isSortable: false },
    { columnDef: 'time', header: 'Time', cellData: (element: Game) => `${this.formatTime(element.date)}`, isSortable: false },
    { columnDef: 'type', header: 'Game Type', cellData: (element: Game) => `${element.gameType}`, isSortable: false },
    { columnDef: 'arena', header: 'Arena', cellData: (element: Game) => `${element.arena}`, isSortable: false },
    { columnDef: 'awayTeam', header: 'Away Team', cellData: (element: Game) => `${element.awayTeam}`, isSortable: false },
    { columnDef: 'awayScore', header: 'Away Score', cellData: (element: Game) => `${element.awayScore || '-'}`, isSortable: false },
    { columnDef: 'homeScore', header: 'Home Score', cellData: (element: Game) => `${element.homeScore || '-'}`, isSortable: false },
    { columnDef: 'homeTeam', header: 'Home Team', cellData: (element: Game) => `${element.homeTeam}`, isSortable: false },
  ];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.datasource = new GamesDataSource(this.dataService);
  }

  ngAfterViewInit() {
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
