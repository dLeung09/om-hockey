import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';

import { Arena } from '../../model/arena';
import { ArenasDataSource } from '../../services/arenas.datasource';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-arenas',
  templateUrl: './arenas.component.html',
  styleUrls: ['./arenas.component.css']
})
export class ArenasComponent implements OnInit {

  private datasource: ArenasDataSource;

  private columns = [
    { columnDef: 'name', header: 'Name', cellData: (element: Arena) => `${element.name}`, isSortable: true },
    { columnDef: 'address', header: 'Address', cellData: (element: Arena) => `${element.address}`, isSortable: false },
  ];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.datasource = new ArenasDataSource(this.dataService);
    this.datasource.setSort('asc', 'name');
    this.datasource.setFilter('active', 'true');
  }

}
