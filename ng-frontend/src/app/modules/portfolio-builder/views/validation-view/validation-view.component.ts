import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { combineLatest, tap } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XlsxTableFieldsComponent } from '../../components/xlsx-table-fields/xlsx-table-fields.component';
import { PortfolioStorageService } from '../../../../shared/services/portfolio-storage/portfolio-storage.service';
import { CardResumeComponent } from '../../../../shared/components/card-resume/card-resume.component.component';
import { CardCompanyDataComponent } from '../../../../shared/components/card-company-data/card-company-data.component.component';
import { CardPortfolioEditComponent } from '../../../../shared/components/card-portfolio-edit/card-portfolio-edit.component';
import { NotificationCardComponent } from '../../../../shared/components/notification-card/notification-card.component';

@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    RouterLink,
    XlsxTableFieldsComponent,
    CardResumeComponent,
    CardCompanyDataComponent,
    CardPortfolioEditComponent,
    NotificationCardComponent,
  ],
  selector: 'app-validation-view',
  templateUrl: './validation-view.component.html',
  styleUrls: ['./validation-view.component.scss'],
})
export class ValidationViewComponent {
  resume!: string;
  companyData!: {
    [key: string]: string | { text: string; hyperlink: string };
  }[];
  displayedColumns = [];
  hasData = false;

  constructor(private portfolioStorageService: PortfolioStorageService) {
    this.observeSessionStorage();
  }

  observeSessionStorage() {
    combineLatest([
      this.portfolioStorageService.getCurrentResume(),
      this.portfolioStorageService.getCurrentCompanyData(),
      this.portfolioStorageService.getCurrentColumns(),
    ])
      .pipe(
        tap(([resume, companyData, columns]) => {
          if (!resume || !companyData || !columns) {
            this.hasData = false;
            return;
          }

          this.resume = resume;
          this.companyData = companyData;
          this.displayedColumns = columns;
          this.hasData = true;
        })
      )
      .subscribe();
  }
}
