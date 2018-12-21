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

  public loading$ = this.loadingSubject.asObservable();

  constructor(private dataService: DataService) { }

  public loadDetails(
    sortColumn: string,
    sortDirection = 'date',
    filterField?: string,
    filterValue?: string
  ): void {
    this.loadingSubject.next(true);

    const dataFilter = new Array<DataFilter>();
    if (filterField != null && filterValue != null) {
      dataFilter.push({ field: 'homeTeam', value: filterValue });
      dataFilter.push({ field: 'awayTeam', value: filterValue });
    }

    this.dataService.getGamesSorted(sortColumn, sortDirection, dataFilter)
    .pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
    )
    .subscribe(games => this.gamesSubject.next(games));
  }

  public connect(collectionViewer: CollectionViewer): Observable<Game[]> {
    // console.log('Connecting data source');
    return this.gamesSubject.asObservable();
  }

  public disconnect(collectionViewer: CollectionViewer): void {
    this.gamesSubject.complete();
    this.loadingSubject.complete();
  }
}
