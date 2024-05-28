import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Portfolio } from '../../../../shared/interfaces/portfolio.interface';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [MatCardModule],
  template: `
    <div class="portfolio">
      <mat-card appearance="outlined">
        <mat-card-header>
          <mat-card-title>{{ portfolio.name }}</mat-card-title>
          <mat-card-subtitle>{{ portfolio.id }}</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <p>{{ portfolio.description }}</p>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: `
    .mat-mdc-card {
      height: 200px;
    }
  `,
})
export class PortfolioComponent {
  @Input() portfolio!: Portfolio;
}
