import { DataSource } from '@angular/cdk/collections';

export abstract class GenericDataSource<T> extends DataSource<T> {
  abstract loadDetails(sortDirection: string, sortColumn?: string, filterField?: string, filterValue?: string): void;
  // abstract filterDetails(field: string, value: string): void;
}
