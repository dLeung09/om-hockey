import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Player } from '../model/player';
import { Team } from '../model/team';
import { DataService } from './data.service';
import { GenericDataSource } from './generic.datasource';

export class TeamsDataSource implements DataSource<Team>, GenericDataSource<Team> {

  private teamsSubject = new BehaviorSubject<Team[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private dataService: DataService) { }

  public loadDetails(
    sortDirection: string,
    sortColumn = 'points',
    filterField?: string,
    filterValue?: string
  ): void {
    this.loadingSubject.next(true);

    this.dataService.getTeamsSorted(sortColumn, sortDirection)
    .pipe(
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
