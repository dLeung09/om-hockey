import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { merge, tap } from 'rxjs/operators';

import { Player } from '../../model/player';
import { Team } from '../../model/team';
import { PlayersDataSource } from '../../services/players.datasource';
import { DataService } from '../../services/data.service';
import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'app-roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.css']
})
export class RosterComponent implements OnInit {

  private teams: Team[] = null;

  private datasources: Array<PlayersDataSource>;

  private columns = [
    { columnDef: 'name', header: 'Name', cellData: (element: Player) => `${element.name}`, isSortable: true },
  ];

  constructor(private dataService: DataService, private backendService: BackendService) { }

  ngOnInit() {
    this.datasources = [];
    this.backendService.getTeams()
      .subscribe(teams => {
        teams.forEach(team => {
          const datasource = new PlayersDataSource(this.dataService);
          datasource.setSort('asc', 'name');
          datasource.setFilter('team', team.name);
          this.datasources.push(datasource);
        });
      });
  }

}
