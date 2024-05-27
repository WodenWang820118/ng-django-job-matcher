import { RouterLink } from '@angular/router';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Observable } from 'rxjs';
import { PortfolioComponent } from './../portfolio/portfolio.component';
import { Portfolio } from '../../../../shared/interfaces/portfolio.interface';

@Component({
  selector: 'app-portfolios',
  standalone: true,
  imports: [AsyncPipe, PortfolioComponent, MatCardModule, RouterLink],
  template: `
    <div class="portfolios">
      <div class="portfolios__items">
        <div class="portfolios__new" [routerLink]="['/', 'build-portfolio']">
          <mat-card>
            <mat-card-header>
              <mat-card-title>New Portfolio</mat-card-title>
              <mat-card-subtitle>Create a new automation</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <p></p>
            </mat-card-content>
          </mat-card>
        </div>
        @for (portfolio of portfolios; track portfolio.id) {
        <app-portfolio
          [portfolio]="portfolio"
          [routerLink]="['/portfolio', portfolio.id]"
          [state]="{ id: portfolio.id }"
        ></app-portfolio>
        }
      </div>
    </div>
  `,
  styles: `
    .mat-mdc-card {
      height: 200px;
    }

    .portfolios {
      &__new {
        cursor: pointer;
      }

      &__items {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        grid-gap: 1rem;
        cursor: pointer;
      }
    }
  `,
})
export class PortfoliosComponent {
  @Input() portfolios!: Portfolio[];
}
