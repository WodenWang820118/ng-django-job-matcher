import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { ResumeFormComponent } from '../../components/resume-form/resume-form.component';
import { XlsxTableComponent } from '../../components/xlsx-table/xlsx-table.component';
import { XlsxTableFieldsComponent } from '../../components/xlsx-table-fields/xlsx-table-fields.component';
import { PortfolioBuilderService } from '../../../../shared/services/portfolio-builder/portfolio-builder.service';
import { PortfolioStorageService } from '../../../../shared/services/portfolio-storage/portfolio-storage.service';
import {
  combineLatest,
  forkJoin,
  map,
  mergeMap,
  of,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  standalone: true,
  imports: [
    ResumeFormComponent,
    XlsxTableComponent,
    XlsxTableFieldsComponent,
    MatButtonModule,
    RouterLink,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  selector: 'app-validation-view',
  template: `
    <div class="validation-view">
      <app-resume-form class="validation-view__resume"></app-resume-form>
      <div class="validation-view__table">
        <app-xlsx-table-fields
          class="validation-view__fields"
        ></app-xlsx-table-fields>
        <app-xlsx-table class="validation-view__table"></app-xlsx-table>
      </div>
      <!-- <button
        mat-flat-button
        color="primary"
        [routerLink]="['/', 'portfolio', 'portfolio-detail', id]"
      >
        Save
      </button> -->
      <mat-card style="width: 100%">
        <mat-card-title>Portfolio</mat-card-title>
        <mat-card-content>
          <p>Save your portfolio</p>
          <mat-form-field>
            <input matInput placeholder="Name" />
          </mat-form-field>
          <mat-form-field>
            <textarea matInput rows="5"></textarea>
          </mat-form-field>
        </mat-card-content>
        <mat-card-actions>
          <button mat-flat-button color="primary" (click)="buildPortfolio()">
            Save
          </button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .validation-view {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2rem;
        padding: 1rem;

        &__resume {
          width: 100%;
        }

        &__table {
          display: flex;
          flex: 1;
          flex-direction: row;
          gap: 1rem;
          width: 100%;
        }

        &__fields {
          width: 100%;
          flex: 1;
        }
      }
    `,
  ],
})
export class ValidationViewComponent {
  constructor(
    private portfolioBuilderService: PortfolioBuilderService,
    private portfolioStorageService: PortfolioStorageService
  ) {}

  // TODO: Implement save functionality
  buildPortfolio() {
    combineLatest([
      this.portfolioStorageService.getCurrentResume(),
      this.portfolioStorageService.getCurrentCompanyData(),
      this.portfolioStorageService.getSelectedColumns(),
    ])
      .pipe(
        map(([resume, companyData, columns]) => {
          const selectedCompanyData = companyData.map((data) => {
            for (const column in data) {
              if (!columns.includes(column)) delete data[column];
            }
            return data;
          });
          return {
            resume,
            selectedCompanyData,
          };
        }),
        mergeMap(({ resume, selectedCompanyData }) => {
          const portfolio = this.portfolioBuilderService
            .withName('New Portfolio')
            .withDescription('New Portfolio')
            .withResume(resume)
            .withCompanyData(selectedCompanyData)
            .build();
          return this.portfolioStorageService.savePortfolio(portfolio);
        })
      )
      .subscribe();
  }
}
