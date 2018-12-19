import { AfterViewInit, Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material';
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

  @Input() games: Game[] = null;
  private datasource: GamesDataSource;

  private displayedColumns = [
    'date',
    'time',
    'type',
    'arena',
    'awayTeam',
    'awayScore',
    'homeScore',
    'homeTeam',
  ];

  @ViewChild(MatSort) sort: MatSort;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.datasource = new GamesDataSource(this.dataService);
    this.datasource.loadGames('', 'date', 'asc');

    if (this.teams === null) {
      this.getTeams();
    }

    this.teamFilter = this.teams[0].name;
  }

  ngAfterViewInit() {
    //this.sort.sortChange
    //  .pipe(
    //    tap(() => console.log('DAVID: sort', this.sort)),
    //    tap(() => this.loadGames())
    //  )
    //.subscribe();
  }

  private loadGames(): void {
    let team = this.teamFilter;
    if (team === 'All Teams') {
      team = '';
    } 

    // console.log('[DAVID] team', team);

    this.datasource.loadGames(
      team,
      'date',
      'asc'
    );
  }

  public getGames(): void {
    this.loadGames();
  }

  public getTeams(): void {
    this.dataService.getTeamsSorted('name', 'asc')
    .subscribe((teams: Team[]) => {
      // console.log('Rretrieving teams. Count:', teams.length);

      // this.teams = DefaultTeams.concat(teams);
    });
  }

  private formatDate(dateStr: string) : string {
    let date = new Date(dateStr);
    let options = { year: 'numeric', month: 'long', day: 'numeric' };

    return date.toLocaleDateString("en-US", options);
  }

  private formatTime(timeStr: string) : string {
    let time = new Date(timeStr);
    let options = { hour: 'numeric', minute: 'numeric' };

    return time.toLocaleString("en-US", options);
  }

}
