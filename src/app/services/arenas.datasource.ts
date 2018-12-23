import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { Arena } from '../model/arena';
import { DataService, DataFilter } from './data.service';
import { GenericDataSource } from './generic.datasource';

export class ArenasDataSource implements DataSource<Arena>, GenericDataSource<Arena> {

  private arenasSubject = new BehaviorSubject<Arena[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  private _sortDirection: string;
  private _sortColumn: string;
  private _filterField: string;
  private _filterValue: string;
  private _numResults: number;

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

  public setNumResults(numResults: number): void {
    this._numResults = numResults;
  }

  public loadDetails(): void {
    this.loadingSubject.next(true);

    const dataFilter = new Array<DataFilter>();
    if (this._filterField != null && this._filterValue != null) {
      dataFilter.push({ field: this._filterField, value: this._filterValue });
    }

    this.dataService.getArenasSorted(this._sortColumn, this._sortDirection, dataFilter)
    .pipe(
      map(arenas => {
        if (this._numResults) {
          return arenas.splice(0, this._numResults);
        }

        return arenas;
      }),
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
    )
    .subscribe(arenas => this.arenasSubject.next(arenas));
  }

  public connect(collectionViewer: CollectionViewer): Observable<Arena[]> {
    return this.arenasSubject.asObservable();
  }

  public disconnect(collectionViewer: CollectionViewer): void {
    this.arenasSubject.complete();
    this.loadingSubject.complete();
  }
}
