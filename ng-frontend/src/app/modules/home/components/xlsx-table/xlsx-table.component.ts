import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Subject, takeUntil, tap } from 'rxjs';
import { XlsxPubSubService } from '../../../../shared/services/xlsx-pub-sub/xlsx-pub-sub.service';
import { displayColumns, dataSource } from './mock-data';
import { SessionStorageService } from '../../../../shared/services/session-storage/session-storage.service';

@Component({
  standalone: true,
  imports: [MatTableModule],
  selector: 'app-xlsx-table',
  templateUrl: './xlsx-table.component.html',
  styleUrls: ['./xlsx-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class XlsxTableComponent implements OnDestroy {
  displayedColumns: string[] = [];
  dataSource: {
    [key: string]: string | { text: string; hyperlink: string };
  }[] = [];
  destroyed$ = new Subject<void>();

  constructor(private xlsxPubSubService: XlsxPubSubService) {
    this.xlsxPubSubService
      .getDisplayedColumns()
      .pipe(
        takeUntil(this.destroyed$),
        tap((columns) => {
          this.displayedColumns = columns;
        })
      )
      .subscribe();
    this.xlsxPubSubService
      .getDataSource()
      .pipe(
        takeUntil(this.destroyed$),
        tap((data) => {
          this.dataSource = data;
        })
      )
      .subscribe();
  }

  isHyperlink(cellData: any): boolean {
    return (
      cellData &&
      typeof cellData === 'object' &&
      'text' in cellData &&
      'hyperlink' in cellData
    );
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
