import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidenavContainerComponent } from '../../../../shared/components/sidnav-container/sidenav-container.component';
import { PortfoliosComponent } from '../../components/portfolios/portfolios.component';
import { PortfolioStorageService } from '../../../../shared/services/portfolio-storage/portfolio-storage.service';
import { Portfolio } from '../../../../shared/interfaces/portfolio.interface';

@Component({
  standalone: true,
  imports: [RouterOutlet, SidenavContainerComponent, PortfoliosComponent],
  selector: 'app-portfolio-view',
  template: `
    <app-sidenav-container>
      <!-- <app-sidenav-list></app-sidenav-list> -->
      <div class="portfolio-view">
        <app-portfolios [portfolios]="portfolios"></app-portfolios>
      </div>
    </app-sidenav-container>
  `,
  styles: [
    `
      .portfolio-view {
        display: flex;
        flex-direction: row;
        padding: 10rem 5rem;
      }
    `,
  ],
})
export class PortfolioViewComponent implements OnInit {
  portfolios: Portfolio[] = [];
  constructor(public portforlioStorageService: PortfolioStorageService) {}

  ngOnInit() {
    this.portforlioStorageService.getPortfolios().subscribe((portfolios) => {
      this.portfolios = portfolios;
    });
  }
}
