import { Component, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { tap } from 'rxjs';
import { XlsxTableComponent } from '../../components/xlsx-table/xlsx-table.component';
import { XlsxTableFieldsComponent } from '../../components/xlsx-table-fields/xlsx-table-fields.component';
import { NotificationCardComponent } from '../../../../shared/components/notification-card/notification-card.component';
import { XlsxPubSubService } from '../../../../shared/services/xlsx-pub-sub/xlsx-pub-sub.service';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  imports: [
    XlsxTableComponent,
    XlsxTableFieldsComponent,
    NotificationCardComponent,
    MatCardModule,
    MatButtonModule,
    RouterLink,
  ],
  selector: 'app-xlsx-table-view',
  template: `
    @if (hasData) {
    <div class="xlsx-table-view">
      <app-xlsx-table-fields
        class="xlsx-table-view__fields"
      ></app-xlsx-table-fields>
      <app-xlsx-table class="xlsx-table-view__table"></app-xlsx-table>
    </div>
    <div class="xlsx-table-view__actions">
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
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: flex-start;
        gap: 2rem;
        padding: 1rem;

        &__actions {
          display: flex;
          justify-content: flex-end;
          padding-right: 1rem;
        }

        &__card {
          width: 50%;
          height: 50%;
        }

        &__header {
          display: flex;
          justify-content: center;
          font-size: 1.5rem;
        }

        &__fields {
          flex: 1;
        }

        &__table {
          flex: 1;
        }
      }
    `,
  ],
})
export class XlsxTableViewComponent {
  hasData = false;
  @ViewChild(XlsxTableFieldsComponent)
  xlsxTableFieldsComponent!: XlsxTableFieldsComponent;
  constructor(private xlsxPubSubService: XlsxPubSubService) {
    this.xlsxPubSubService
      .getDataSource()
      .pipe(
        tap((data) => {
          this.hasData = data.length > 0;
        })
      )
      .subscribe();
  }

  onSaveColumns(): void {
    this.xlsxTableFieldsComponent.onSaveColumns();
  }
}
