import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, finalize } from 'rxjs/operators';
import { Player } from '../model/player';
import { DataService } from './data.service';

export class PlayersDataSource implements DataSource<Player> {

  private playersSubject = new BehaviorSubject<Player[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private dataService: DataService) { }

  public loadDetails(
    sortDirection: string,
    sortColumn = 'points'
  ): void {
    this.loadingSubject.next(true);

    this.dataService.getPlayersSorted(sortColumn, sortDirection)
    .pipe(
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
