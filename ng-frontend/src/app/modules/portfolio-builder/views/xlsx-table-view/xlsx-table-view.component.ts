import { Component, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { combineLatest, tap } from 'rxjs';
import { XlsxTableFieldsComponent } from '../../components/xlsx-table-fields/xlsx-table-fields.component';
import { NotificationCardComponent } from '../../../../shared/components/notification-card/notification-card.component';
import { CardCompanyDataComponent } from '../../../../shared/components/card-company-data/card-company-data.component.component';
import { PortfolioStorageService } from '../../../../shared/services/portfolio-storage/portfolio-storage.service';

@Component({
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    RouterLink,
    XlsxTableFieldsComponent,
    NotificationCardComponent,
    CardCompanyDataComponent,
  ],
  selector: 'app-xlsx-table-view',
  template: `
    @if (hasData) {
    <div class="xlsx-table-view">
      <div class="xlsx-table-view__row">
        <app-xlsx-table-fields
          class="xlsx-table-view__row__fields"
        ></app-xlsx-table-fields>
        <app-card-company-data
          class="xlsx-table-view__row__company-data"
          [dataSource]="companyData"
          [displayedColumns]="displayedColumns"
        ></app-card-company-data>
      </div>
    </div>
    <div class="xlsx-table-view__row">
      <button
        mat-flat-button
        color="primary"
        (click)="onSaveColumns()"
        [routerLink]="['..', 'validation']"
      >
        Save
      </button>
    </div>
    } @else {
    <div class="xlsx-table-view__fields">
      <app-notification-card>
        <p>No data available.</p>
      </app-notification-card>
    </div>
    }
  `,
  styles: [
    `
      .xlsx-table-view {
        margin: 0 auto;
        padding: 1rem;

        &__row {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 1rem;

          &__fields {
            width: 100%;
            flex: 1;
            margin-right: 1rem;
          }

          &__company-data {
            width: 100%;
            flex: 2;
            max-width: 1000px;
            max-height: 600px;
            overflow: auto;
          }
        }
      }
    `,
  ],
})
export class XlsxTableViewComponent {
  companyData!: {
    [key: string]: string | { text: string; hyperlink: string };
  }[];
  displayedColumns: string[] = [];
  hasData = false;
  @ViewChild(XlsxTableFieldsComponent)
  xlsxTableFieldsComponent!: XlsxTableFieldsComponent;

  constructor(private portfolioStorageService: PortfolioStorageService) {
    this.observeSessionStorage();
  }

  observeSessionStorage() {
    combineLatest([
      this.portfolioStorageService.getCurrentCompanyData(),
      this.portfolioStorageService.getCurrentColumns(),
    ])
      .pipe(
        tap(([companyData, columns]) => {
          this.hasData = companyData.length > 0;
          this.companyData = companyData;
          this.displayedColumns = columns;
        })
      )
      .subscribe();
  }

  onSaveColumns(): void {
    this.xlsxTableFieldsComponent.onSaveColumns();
  }
}
