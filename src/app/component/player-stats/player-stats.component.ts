import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { merge, tap } from 'rxjs/operators';

import { Player } from '../../model/player';
import { PlayersDataSource } from '../../services/players.datasource';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-player-stats',
  templateUrl: './player-stats.component.html',
  styleUrls: ['./player-stats.component.css']
})
export class PlayerStatsComponent implements OnInit, AfterViewInit {

  private players: Player[] = null;
  private datasource: PlayersDataSource;

  private columns = [
    { columnDef: 'name', header: 'Name', cellData: (element: Player) => `${element.name}`, isSortable: true },
    { columnDef: 'team', header: 'Team', cellData: (element: Player) => `${element.team}`, isSortable: true },
    { columnDef: 'gamesPlayed', header: 'GP', cellData: (element: Player) => `${element.gamesPlayed}`, isSortable: true },
    { columnDef: 'goals', header: 'G', cellData: (element: Player) => `${element.goals}`, isSortable: true },
    { columnDef: 'assists', header: 'A', cellData: (element: Player) => `${element.assists}`, isSortable: true },
    { columnDef: 'points', header: 'P', cellData: (element: Player) => `${element.points}`, isSortable: true },
    { columnDef: 'penalties', header: 'PIM', cellData: (element: Player) => `${element.penalties}`, isSortable: true },
    { columnDef: 'pointsPerGame', header: 'PPG', cellData: (element: Player) => `${element.pointsPerGame.toFixed(2)}`, isSortable: true },
  ];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.datasource = new PlayersDataSource(this.dataService);
  }

  ngAfterViewInit() { }
}
