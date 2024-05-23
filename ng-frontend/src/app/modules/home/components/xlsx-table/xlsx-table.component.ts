import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Subject, takeUntil, tap } from 'rxjs';
import { XlsxService } from '../../../../shared/services/xlsx/xlsx.service';
import { displayColumns, dataSource } from './mock-data';

@Component({
  standalone: true,
  imports: [MatTableModule],
  selector: 'app-xlsx-table',
  template: `
    <div class="xlsx-table">
      <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">
        @for (column of displayedColumns; track column) {
        <div [matColumnDef]="column">
          <th mat-header-cell *matHeaderCellDef>
            {{ column }}
          </th>
          <td mat-cell *matCellDef="let element">
            @if (isHyperlink(element[column])) {
            <div>
              <a [href]="element[column].hyperlink">{{
                element[column].text.slice(0, 30) +
                  (element[column].text.length > 30 ? '...' : '')
              }}</a>
            </div>
            } @else {
            {{
              element[column].slice(0, 100) +
                (element[column].length > 100 ? '...' : '')
            }}
            }
          </td>
        </div>
        }

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
      </table>
    </div>
  `,
  styles: [
    `
      .xlsx-table {
        width: 100%;
        height: 100%;
        max-width: 1000px;
        max-height: 550px;
        margin: 0 auto;
        overflow: auto;
      }

      th.mat-mdc-header-cell,
      td.mat-mdc-cell {
        min-width: 200px;
        max-width: 300px;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class XlsxTableComponent implements OnDestroy {
  displayedColumns: string[] = [];
  dataSource: {
    [key: string]: string | { text: string; hyperlink: string };
  }[] = [];
  destroyed$ = new Subject<void>();

  constructor(private xlsxService: XlsxService) {
    this.xlsxService
      .getDisplayedColumns()
      .pipe(
        takeUntil(this.destroyed$),
        tap((columns) => {
          this.displayedColumns = columns;
        })
      )
      .subscribe();
    this.xlsxService
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
