import { Component } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { tap } from 'rxjs';
import { XlsxService } from '../../../../shared/services/xlsx/xlsx.service';

interface Column {
  name: string;
  selected: boolean;
  color: string;
}

@Component({
  standalone: true,
  imports: [
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
  ],
  selector: 'app-xlsx-table-fields',
  template: `
    <div class="xlsx-table-fields">
      <mat-card appearance="outlined">
        <mat-card-title class="xlsx-table-fields__header"
          >Fields</mat-card-title
        >
        <mat-checkbox
          class="example-margin"
          [checked]="allSelected"
          [indeterminate]="someSelected()"
          (change)="setAll($event.checked)"
        >
          Select All
        </mat-checkbox>
        <ul>
          @for (column of columns; track column) {
          <li>
            <mat-checkbox
              [(ngModel)]="column.selected"
              [color]="column.color"
              (ngModelChange)="updateAllSelected()"
            >
              {{ column.name }}
            </mat-checkbox>
          </li>
          }
        </ul>
        <mat-card-actions align="start">
          <button mat-flat-button color="primary">Save</button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .xlsx-table-fields {
        padding: 1rem;
        overflow: auto;

        &__header {
          padding: 1rem;
          display: flex;
          justify-content: baseline;
          font-size: 1.5rem;
        }
      }

      ul {
        list-style-type: none;
        margin-right: 1rem;
      }
    `,
  ],
})
export class XlsxTableFieldsComponent {
  columns: Column[] = [];
  allSelected: boolean = false;

  constructor(private xlsxService: XlsxService) {
    this.xlsxService
      .getDisplayedColumns()
      .pipe(
        tap((columns) => {
          this.columns = columns.map((column) => ({
            name: column,
            selected: false,
            color: 'primary',
          }));
        })
      )
      .subscribe();
  }

  updateAllSelected() {
    this.allSelected =
      this.columns != null && this.columns.every((t) => t.selected);
  }

  someSelected(): boolean {
    if (this.columns == null) {
      return false;
    }
    return (
      this.columns.filter((t) => t.selected).length > 0 && !this.allSelected
    );
  }

  setAll(selected: boolean) {
    this.allSelected = selected;
    if (this.columns == null) {
      return;
    }
    this.columns.forEach((t) => (t.selected = selected));
  }
}
