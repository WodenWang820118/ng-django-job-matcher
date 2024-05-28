import { Component } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { combineLatest, tap } from 'rxjs';
import { XlsxPubSubService } from '../../../../shared/services/xlsx-pub-sub/xlsx-pub-sub.service';
import { PortfolioStorageService } from '../../../../shared/services/portfolio-storage/portfolio-storage.service';

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
        <mat-card-content class="xlsx-table-fields__content">
          @for (column of columns; track column) {
          <mat-checkbox
            [(ngModel)]="column.selected"
            [color]="column.color"
            (ngModelChange)="updateAllSelected()"
          >
            {{ column.name }}
          </mat-checkbox>
          }
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .xlsx-table-fields {
        height: 100%;

        &__header {
          padding: 1rem;
          display: flex;
          justify-content: baseline;
          font-size: 1.5rem;
        }

        &__content {
          display: flex;
          flex-direction: column;
          padding-left: 5px;
          margin-right: 10px;
        }
      }
    `,
  ],
})
export class XlsxTableFieldsComponent {
  columns: Column[] = [];
  allSelected: boolean = false;

  constructor(
    private xlsxPubSubService: XlsxPubSubService,
    private portfolioStorageService: PortfolioStorageService
  ) {
    combineLatest([
      this.xlsxPubSubService.getDisplayedColumns(),
      this.portfolioStorageService.getSelectedColumns(),
    ])
      .pipe(
        tap(([columns, selectedColumns]) => {
          this.columns = columns.map((column) => ({
            name: column,
            selected: selectedColumns.includes(column),
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

  onSaveColumns() {
    const selectedColumns = this.columns
      .filter((column) => column.selected)
      .map((column) => column.name);
    this.portfolioStorageService.setSelectedColumns(selectedColumns);
  }
}
