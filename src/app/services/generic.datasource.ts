import { DataSource } from '@angular/cdk/collections';

export abstract class GenericDataSource<T> extends DataSource<T> {
  abstract setSort(sortDirection: string, sortColumn: string): void;
  abstract setFilter(filterField: string, filterValue: string): void;
  abstract setNumResults(numResults: number): void;
  abstract loadDetails(): void;
}
