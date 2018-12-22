import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, finalize } from 'rxjs/operators';
import { Player } from '../model/player';
import { DataService } from './data.service';

export class PlayersDataSource implements DataSource<Player> {

  private playersSubject = new BehaviorSubject<Player[]>([]);
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

    const dataFilter = [{ field: 'team', value: this._filterValue }];
    this.dataService.getPlayersSorted(this._sortColumn, this._sortDirection, dataFilter)
    .pipe(
      map(players => {
        if (this._numResults) {
          return players.splice(0, this._numResults);
        }

        return players;
      }),
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
    )
    .subscribe(players => this.playersSubject.next(players));
  }

  public connect(collectionViewer: CollectionViewer): Observable<Player[]> {
    return this.playersSubject.asObservable();
  }

  public disconnect(collectionViewer: CollectionViewer): void {
    this.playersSubject.complete();
    this.loadingSubject.complete();
  }
}
