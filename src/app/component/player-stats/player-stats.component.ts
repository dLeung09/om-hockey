import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
//import { merge, tap } from 'rxjs/operators';
import {merge} from "rxjs/operators";


import { PlayersDataSource } from '../../services/players.datasource';
import { BackendService } from '../../services/backend.service';
import { Player } from '../../model/player';

@Component({
  selector: 'app-player-stats',
  templateUrl: './player-stats.component.html',
  styleUrls: ['./player-stats.component.css']
})
export class PlayerStatsComponent implements OnInit, AfterViewInit {

  private players: Player[] = null;
  private datasource: PlayersDataSource;

  private selectedColumn: string;

  private displayedColumns = [
    'player',
    'team',
    'gamesPlayed',
    'goals',
    'assists',
    'points',
    'penalties',
    'pointsPerGame'
  ];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private backendService: BackendService) { }

  ngOnInit() {
    this.datasource = new PlayersDataSource(this.backendService);
    this.datasource.loadPlayers('', 'points', 'desc', 0, 25);
  }

  ngAfterViewInit() {
    this.sort.sortChange
      .pipe(
        tap(() => console.log("DAVID: sort", this.sort)),
        tap(() => this.loadPlayers())
      )
    .subscribe();
  }

  private loadPlayers(): void {
    this.datasource.loadPlayers(
      '',
      this.sort.active,
      this.sort.direction,
      0,
      25
    );
  }
}
