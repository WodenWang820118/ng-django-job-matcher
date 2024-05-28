import { Component } from '@angular/core';
import { map, switchMap, take, tap } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { SidenavContainerComponent } from '../../../../shared/components/sidnav-container/sidenav-container.component';
import { CardCompanyDataComponent } from '../../../../shared/components/card-company-data/card-company-data.component.component';
import { CardPortfolioInfoComponent } from '../../../../shared/components/card-portfolio-info/card-portfolio-info.component.component';
import { CardResumeComponent } from '../../../../shared/components/card-resume/card-resume.component.component';
import { CosineSimilarityService } from '../../../../shared/services/api/cosine-similarity/cosine-similarity.service';
import { db } from '../../../../db';

@Component({
  standalone: true,
  imports: [
    SidenavContainerComponent,
    CardCompanyDataComponent,
    CardPortfolioInfoComponent,
    CardResumeComponent,
    MatButtonModule,
  ],
  selector: 'app-portfolio-detail-view',
  templateUrl: './portfolio-detail-view.component.html',
  styleUrls: ['./portfolio-detail-view.component.scss'],
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

  constructor(
    private route: ActivatedRoute,
    private cosineSimilarityService: CosineSimilarityService
  ) {
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
      });
  }

  calculateCosineSimilarity() {
    this.cosineSimilarityService
      .calculateCosineSimilarity(this.resume, this.dataSource)
      .pipe(
        tap((data) => {
          if (!data.results) return;
          this.dataSource = this.dataSource
            .map((rawCompany) => {
              const companyScore = data.results.find(
                (company) => company.id === rawCompany['id']
              );
              return {
                ...rawCompany,
                score: companyScore ? companyScore.score.toString() : 'N/A',
              };
            })
            .sort((a, b) => {
              return parseFloat(b.score) - parseFloat(a.score);
            });

          this.displayedColumns = [...this.displayedColumns, 'score'];
          console.log('data source: ', this.dataSource);
        })
      )
      .subscribe();
  }
}
