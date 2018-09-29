import { Component, OnInit, Input } from '@angular/core';

import { BackendService } from '../../services/backend.service';
import { Game } from '../../model/game';
import { Team } from '../../model/team';

const DefaultTeams: Team[] = [
  { "id": -1, "name": "All Teams", "players": [] }
];

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  @Input() games: Game[] = null;
  private teams: Team[] = null;

  public teamFilter: number = -1;

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

  constructor(private backendService: BackendService) { }

  ngOnInit() {
    if (this.games === null) {
      this.getGames();
    }

    if (this.teams === null) {
      this.getTeams();
    }
  }

  public getGames(): void {
    this.backendService.getGames(this.teamFilter)
    .subscribe((games: Game[]) => {
      console.log(`Retrieving games. Count: ${games.length}`);
      this.games = games
    });
  }

  public getTeams(): void {
    this.backendService.getTeams()
    .subscribe((teams: Team[]) => {
      console.log(`Retrieving teams. Count: ${teams.length}`);

      this.teams = DefaultTeams.concat(teams);
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
