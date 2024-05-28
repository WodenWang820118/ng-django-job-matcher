import { Component } from '@angular/core';
import { map, switchMap } from 'rxjs';
import { SidenavContainerComponent } from '../../../../shared/components/sidnav-container/sidenav-container.component';
import { CardCompanyDataComponent } from '../../../../shared/components/card-company-data/card-company-data.component.component';
import { CardPortfolioInfoComponent } from '../../../../shared/components/card-portfolio-info/card-portfolio-info.component.component';
import { CardResumeComponent } from '../../../../shared/components/card-resume/card-resume.component.component';
import { ActivatedRoute } from '@angular/router';
import { db } from '../../../../db';

@Component({
  standalone: true,
  imports: [
    SidenavContainerComponent,
    CardCompanyDataComponent,
    CardPortfolioInfoComponent,
    CardResumeComponent,
  ],
  selector: 'app-portfolio-detail-view',
  template: ` <app-sidenav-container>
    <div class="portfolio-detail">
      <div class="portfolio-detail__row">
        <app-card-portfolio-info
          class="portfolio-detail__row__elem info-card"
          [portfolioId]="portfolioId"
          [name]="name"
          [description]="description"
        ></app-card-portfolio-info>
        <app-card-resume
          class="portfolio-detail__row__elem resume-card"
          [resume]="resume"
        ></app-card-resume>
      </div>
      <div class="portfolio-detail__row">
        <app-card-company-data
          class="portfolio-detail__row__elem"
          [dataSource]="dataSource"
          [displayedColumns]="displayedColumns"
        >
        </app-card-company-data>
      </div>
    </div>
  </app-sidenav-container>`,
  styles: [
    `
      .portfolio-detail {
        margin: 0 auto;
        max-width: 1280px;

        &__row {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
          margin-top: 2rem;

          &__elem {
            flex: 1;
            max-height: 450px !important;
            overflow: auto !important;
          }
        }
      }

      .info-card {
        flex: 1;
      }

      .resume-card {
        flex: 2;
      }
    `,
  ],
})
export class PortfolioDetailViewComponent {
  portfolioId = '';
  name = '';
  description = '';
  resume = '';
  dataSource: {
    [key: string]: string | { text: string; hyperlink: string };
  }[] = [];
  displayedColumns: string[] = [];

  constructor(private route: ActivatedRoute) {
    this.observeIndexDb();
  }

  observeIndexDb() {
    this.route.params
      .pipe(
        map((params) => {
          return params['id'];
        }),
        switchMap((id) => {
          return db.getPortfolio(id);
        })
      )
      .subscribe((portfolio) => {
        if (!portfolio) return;
        this.portfolioId = portfolio.id;
        this.name = portfolio.name;
        this.description = portfolio.description;
        this.resume = portfolio.resume;
        this.dataSource = portfolio.companyData;
        this.displayedColumns = Object.keys(portfolio.companyData[0]);

        console.log('portfolio', portfolio);
      });
  }
}
