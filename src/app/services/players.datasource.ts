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

  public loadPlayers(
    team: string,
    sortColumn: string,
    sortDirection: string
  ): void {
    this.loadingSubject.next(true);

    this.dataService.getPlayersSorted(team, '', sortColumn, sortDirection)
    .pipe(
      catchError(() => of([])),
      map((players) => {
        players.forEach(player => {
          if (player.gamesPlayed < 1) {
            player.pointsPerGame = 0;
            return;
          }

          player.pointsPerGame = (player.points / player.gamesPlayed);
        });
        return players;
      }),
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
