import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Player } from '../model/player';
import { BackendService } from './backend.service';

export class PlayersDataSource implements DataSource<Player> {

  private playersSubject = new BehaviorSubject<Player[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private backendService: BackendService) { }

  public loadPlayers(
    team: string,
    sortColumn: string,
    sortDirection: string,
    pageIndex: number,
    pageSize: number
  ): void {
    this.loadingSubject.next(true);

    this.backendService.getPlayersSorted(team, '', sortColumn, sortDirection, pageIndex, pageSize)
    .pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
    )
    .subscribe(players => this.playersSubject.next(players));
  }

  public connect(collectionViewer: CollectionViewer): Observable<Player[]> {
    console.log("Connecting data source");
    return this.playersSubject.asObservable();
  }

  public disconnect(collectionViewer: CollectionViewer): void {
    this.playersSubject.complete();
    this.loadingSubject.complete();
  }
}
