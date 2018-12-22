import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { Player } from '../model/player';
import { Team } from '../model/team';
import { DataService, DataFilter } from './data.service';
import { GenericDataSource } from './generic.datasource';

export class TeamsDataSource implements DataSource<Team>, GenericDataSource<Team> {

  private teamsSubject = new BehaviorSubject<Team[]>([]);
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

    this.dataService.getTeamsSorted(this._sortColumn, this._sortDirection, dataFilter)
    .pipe(
      map(teams => {
        if (this._numResults) {
          return teams.splice(0, this._numResults);
        }

        return teams;
      }),
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
    )
    .subscribe(teams => this.teamsSubject.next(teams));
  }

  public connect(collectionViewer: CollectionViewer): Observable<Team[]> {
    return this.teamsSubject.asObservable();
  }

  public disconnect(collectionViewer: CollectionViewer): void {
    this.teamsSubject.complete();
    this.loadingSubject.complete();
  }
}
