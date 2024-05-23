import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { tap } from 'rxjs';
import { XlsxTableComponent } from '../../components/xlsx-table/xlsx-table.component';
import { XlsxTableFieldsComponent } from '../../components/xlsx-table-fields/xlsx-table-fields.component';
import { NotificationCardComponent } from '../../../../shared/components/notification-card/notification-card.component';
import { XlsxService } from '../../../../shared/services/xlsx/xlsx.service';

@Component({
  standalone: true,
  imports: [
    XlsxTableComponent,
    XlsxTableFieldsComponent,
    NotificationCardComponent,
    MatCardModule,
  ],
  selector: 'app-xlsx-table-view',
  template: ` <div class="xlsx-table-view">
    @if (hasData) {
    <app-xlsx-table-fields
      class="xlsx-table-view__fields"
    ></app-xlsx-table-fields>
    <ng-container>
      <app-xlsx-table class="xlsx-table-view__table"></app-xlsx-table>
    </ng-container>
    } @else {
    <app-notification-card>
      <p>No data available.</p>
    </app-notification-card>
    }
  </div>`,
  styles: [
    `
      .xlsx-table-view {
        width: 900px;
        height: 500px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 2rem;

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
  constructor(private xlsxService: XlsxService) {
    this.xlsxService
      .getDataSource()
      .pipe(
        tap((data) => {
          this.hasData = data.length > 0;
        })
      )
      .subscribe();
  }
}
