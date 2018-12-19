import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Game } from '../model/game';
import { Player } from '../model/player';
import { DataService } from './data.service';

export class GamesDataSource implements DataSource<Game> {

  private gamesSubject = new BehaviorSubject<Game[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private dataService: DataService) { }

  public loadGames(
    team: string,
    sortColumn: string,
    sortDirection: string
  ): void {
    this.loadingSubject.next(true);

    this.dataService.getGamesSorted(team, sortColumn, sortDirection)
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
