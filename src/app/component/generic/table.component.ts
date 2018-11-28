import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material';
import { Observable } from 'rxjs';
import { merge, tap } from 'rxjs/operators';

import { Arena } from '../../model/arena';
import { Game } from '../../model/game';
import { Player } from '../../model/player';
import { Team, GameScore } from '../../model/team';

import { GameDataSource } from '../../services/games.datasource';
import { PlayerDataSource } from '../../services/players.datasource';
import { TeamDataSource } from '../../services/games.datasource';

import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, AfterViewInit {
}
