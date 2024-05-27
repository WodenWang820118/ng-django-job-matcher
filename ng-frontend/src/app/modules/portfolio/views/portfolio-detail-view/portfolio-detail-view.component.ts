import { Component } from '@angular/core';
import { PortfolioDetailComponent } from '../../components/portfolio-detail/portfolio-detail.component';

@Component({
  standalone: true,
  imports: [PortfolioDetailComponent],
  selector: 'app-portfolio-detail-view',
  template: ` <app-portfolio-detail></app-portfolio-detail> `,
})
export class PortfolioDetailViewComponent {}
