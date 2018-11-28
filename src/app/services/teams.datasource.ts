import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Player } from '../model/player';
import { Team } from '../model/team';
import { DataService } from './data.service';
//import { BackendService } from './backend.service';

export class TeamDataSource implements DataSource<Team> {

  private teamsSubject = new BehaviorSubject<Team[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private dataService: DataService) { }
  //constructor(private backendService: BackendService) { }

  public loadTeams(
    sortColumn: string,
    sortDirection: string
  ): void {
    this.loadingSubject.next(true);

    this.dataService.getTeamsSorted(sortColumn, sortDirection)
    //this.backendService.getTeamsSorted(sortColumn, sortDirection, pageIndex, pageSize)
    .pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
    )
    .subscribe(teams => this.teamsSubject.next(teams));
  }

  public connect(collectionViewer: CollectionViewer): Observable<Team[]> {
    //console.log('Connecting team data source');
    return this.teamsSubject.asObservable();
  }

  public disconnect(collectionViewer: CollectionViewer): void {
    this.teamsSubject.complete();
    this.loadingSubject.complete();
  }
}
