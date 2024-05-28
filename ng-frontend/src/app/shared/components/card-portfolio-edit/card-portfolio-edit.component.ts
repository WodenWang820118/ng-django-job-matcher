import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PortfolioStorageService } from '../../services/portfolio-storage/portfolio-storage.service';
import {
  combineLatest,
  map,
  mergeMap,
  of,
  Subject,
  Subscription,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs';
import { PortfolioBuilderService } from '../../services/portfolio-builder/portfolio-builder.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { db } from '../../../db';
import { Portfolio } from '../../interfaces/portfolio.interface';

@Component({
  standalone: true,
  imports: [
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  selector: 'app-card-portfolio-edit',
  templateUrl: './card-portfolio-edit.component.html',
})
export class CardPortfolioEditComponent implements OnDestroy {
  infoForm = this.fb.group({
    name: ['', Validators.required],
    description: [''],
  });
  portfolioId!: string;
  destroyed$ = new Subject<void>();
  @Output() updateComplete = new EventEmitter<boolean>();

  constructor(
    private fb: FormBuilder,
    private portfolioStorageService: PortfolioStorageService,
    private portfolioBuilderService: PortfolioBuilderService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.observeIndexDb();
  }

  buildPortfolio() {
    return combineLatest([
      this.portfolioStorageService.getCurrentResume(),
      this.portfolioStorageService.getCurrentCompanyData(),
      this.portfolioStorageService.getSelectedColumns(),
    ])
      .pipe(
        take(1),
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
          if (this.infoForm.invalid) {
            alert('Please fill out the form');
            return of(null);
          }
          const portforlioName = this.infoForm.controls['name'].value as string;
          const portfolioDescription = this.infoForm.controls['description']
            .value as string;

          console.log('Building portfolio with data: ', {
            portforlioName,
            portfolioDescription,
            resume,
            selectedCompanyData,
          });

          this.portfolioStorageService.setCurrentPortfolioName(portforlioName);
          this.portfolioStorageService.setCurrentPortfolioDescription(
            portfolioDescription
          );

          const portfolio = this.portfolioBuilderService
            .withName(portforlioName)
            .withDescription(portfolioDescription)
            .withResume(resume)
            .withCompanyData(selectedCompanyData)
            .build();
          return this.portfolioStorageService.savePortfolio(portfolio);
        }),
        switchMap(() => {
          if (this.infoForm.invalid) return of(null);
          this.portfolioStorageService.clearSessionStorage();
          return this.router.navigate(['/portfolio']);
        })
      )
      .subscribe();
  }

  onSaveForm() {
    this.route.params
      .pipe(
        take(1),
        switchMap((params) => {
          const name = this.infoForm.value.name;
          const description = this.infoForm.value.description;
          if (!name && !description) return of(Subscription.EMPTY);

          if (!params['id']) {
            console.log('Building portfolio');
            return of(this.buildPortfolio());
          } else {
            console.log('Updating portfolio');
            const portfolio: Partial<Portfolio> = {
              name: name as string,
              description: description as string,
            };
            return of(db.updatePortfolio(params['id'], portfolio)).pipe(
              tap(() => {
                this.updateComplete.emit(true);
              })
            );
          }
        })
      )
      .subscribe();
  }

  observeIndexDb() {
    this.route.params
      .pipe(
        takeUntil(this.destroyed$),
        switchMap((params) => {
          return db.getPortfolio(params['id']);
        }),
        map((portfolio) => {
          if (!portfolio) return;
          this.portfolioId = portfolio.id;
          this.infoForm.patchValue({
            name: portfolio.name,
            description: portfolio.description,
          });
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
