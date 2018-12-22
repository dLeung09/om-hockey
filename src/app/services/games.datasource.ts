import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Game } from '../model/game';
import { Player } from '../model/player';
import { DataService, DataFilter } from './data.service';
import { GenericDataSource } from './generic.datasource';

export class GamesDataSource implements DataSource<Game>, GenericDataSource<Game> {

  private gamesSubject = new BehaviorSubject<Game[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  private _sortDirection: string;
  private _sortColumn: string;
  private _filterField: string;
  private _filterValue: string;

  public loading$ = this.loadingSubject.asObservable();

  constructor(private dataService: DataService) { }

  public setSort(sortDirection: string, sortColumn: string): void {
    this._sortDirection = sortDirection;
    this._sortColumn = sortColumn;
  }

  public setFilter(filterField: string, filterValue: string): void {
    this._filterField = filterField;
    this._filterValue = filterValue;
  }

  public loadDetails(): void {
    this.loadingSubject.next(true);

    const dataFilter = new Array<DataFilter>();
    if (this._filterField != null && this._filterValue) {
      dataFilter.push({ field: 'awayTeam', value: this._filterValue });
      dataFilter.push({ field: 'homeTeam', value: this._filterValue });
    }

    this.dataService.getGamesSorted(this._sortColumn, this._sortDirection, dataFilter)
    .pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
    )
    .subscribe(games => this.gamesSubject.next(games));
  }

  public connect(collectionViewer: CollectionViewer): Observable<Game[]> {
    return this.gamesSubject.asObservable();
  }

  public disconnect(collectionViewer: CollectionViewer): void {
    this.gamesSubject.complete();
    this.loadingSubject.complete();
  }
}
