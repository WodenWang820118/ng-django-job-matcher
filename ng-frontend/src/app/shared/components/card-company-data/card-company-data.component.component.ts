import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

@Component({
  standalone: true,
  imports: [NgFor, MatCardModule, MatTableModule],
  selector: 'app-card-company-data',
  template: `<mat-card appearance="outlined">
    <mat-card-header>
      <mat-card-title>Company Data</mat-card-title>
    </mat-card-header>
    <mat-card-content>
      <table mat-table [dataSource]="dataSource">
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
    </mat-card-content>
  </mat-card>`,
  styles: [
    `
      th.mat-mdc-header-cell,
      td.mat-mdc-cell {
        min-width: 200px;
        max-width: 300px;
      }
    `,
  ],
})
export class CardCompanyDataComponent {
  @Input() dataSource!: {
    [key: string]: string | { text: string; hyperlink: string };
  }[];
  @Input() displayedColumns!: string[];

  isHyperlink(cellData: any): boolean {
    return (
      cellData &&
      typeof cellData === 'object' &&
      'text' in cellData &&
      'hyperlink' in cellData
    );
  }
}
