import { DataSource } from '@angular/cdk/collections';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material';
import { Observable } from 'rxjs';
import { merge, tap } from 'rxjs/operators';

import { Arena } from '../../model/arena';
import { Game } from '../../model/game';
import { Player } from '../../model/player';
import { Team, GameScore } from '../../model/team';

import { GenericDataSource } from '../../services/generic.datasource';

import { DataService } from '../../services/data.service';

export interface TableColumn {
  columnDef: string;
  header: string;
  cellData: (any) => string;
};

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, AfterViewInit {

  @Input()
  private datasource: GenericDataSource<any>;

  @Input()
  private columns: Array<any>;

  private displayColumns: Array<string>;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.displayColumns = this.columns.map(c => c.columnDef);
    this.datasource.loadDetails();
  }

  ngAfterViewInit() {
    this.sort.sortChange.pipe(
      tap(() => this.loadDetails()),
    ).subscribe();
  }

  private loadDetails(): void {
    this.datasource.setSort(this.sort.direction, this.sort.active);
    this.datasource.loadDetails();
  }
}
